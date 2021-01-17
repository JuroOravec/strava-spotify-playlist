import lowerCase from 'lodash/lowerCase';

import getActivityUrl from '../../strava/utils/getActivityUrl';
import type {
  ActivityInput,
  TrackWithMetadata,
  ActivityTemplateContext,
  PlaylistTemplateContext,
  TemplateContextActivity,
  TemplateContextTrack,
  TemplateContextMeta,
} from '../types';
import unixTimestampToDate from './unixTimestampToDate';
import setOnMissingPropStringifier from './setOnMissingPropStringifier';

/** Capture '01:23:45' in `2021-01-01T01:23:45.678Z"` */
const timeFromIsoDateRegex = /(?<=T).*?(?=\.)/i;

const createPlaylistTemplateContext = (
  input: {
    activity: ActivityInput;
    tracks: TrackWithMetadata[];
    meta: TemplateContextMeta;
  },
  options: {
    missingValue?: string;
  } = {}
): {
  context: PlaylistTemplateContext;
  proxiedContext: PlaylistTemplateContext;
} => {
  const { tracks: inputTracks, activity: inputActivity, meta } = input;
  const { missingValue = 'UNKNOWN' } = options;

  const formatDuration = (durationInMs: number): string | undefined => {
    const isoDate = new Date(durationInMs).toISOString();
    return isoDate.match(timeFromIsoDateRegex)?.[0];
  };

  const tracks = inputTracks.map(
    (track): TemplateContextTrack => ({
      name: track.metadata?.name || missingValue,
      album: track.metadata?.album.name || missingValue,
      artist:
        track.metadata?.artists.map((artist) => artist.name).join(', ') ||
        missingValue,
      duration:
        (track.metadata && formatDuration(track.metadata.duration_ms)) ||
        missingValue,
      startTime:
        (track.startTime && formatDuration(track.startTime * 1000)) ||
        missingValue,
    })
  );

  const formattedSongs: string = tracks.length
    ? tracks
        .map((track) => `${track.startTime} ${track.name} - ${track.artist}`)
        .join('\n')
    : 'No songs';
  const tracklist = `Tracklist:\n${formattedSongs}`;

  const {
    activityId,
    activityType,
    title,
    description,
    endTime,
    startTime,
  } = inputActivity;

  const activity: TemplateContextActivity = {
    type: (activityType ? lowerCase(activityType) : 'activity') || missingValue,
    title: title || '',
    description: description || '',
    date: unixTimestampToDate(startTime).toDateString() || missingValue,
    duration: formatDuration((endTime - startTime) * 1000) || missingValue,
    url: getActivityUrl(activityId) || missingValue,
  };

  const context: PlaylistTemplateContext = {
    activity,
    playlist: {
      tracks,
      tracklist,
    },
    meta,
  };

  /**
   * Wrap the context in proxy that prints `missingValue` when user is trying
   * to access invalid props, or trying to access deeper props than possible.
   *
   * @example
   * const ctx = { a: 2, b: { c: 3, d: null } };
   * const p = setOnMissingPropStringifier(ctx);
   * const render = handlebars.compile(
   *   'k: {{ k }},\na: {{ a }},\nb: {{ b }},\nb.c: {{ b.c }},\nb.d: {{ b.d }},\nb.d.c: {{ b.d.c }},\nb.d.c.e.f: {{ b.d.c.e.f }}',
   *   compilerOptions,
   * );
   * console.log(render(ctx));
   * // k: UNKNOWN           // Invalid top-level prop
   * // a: 2,                // Matched value
   * // b: [object Object],  // Matched value
   * // b.c: 3,              // Matched value
   * // b.d: null,           // Matched value
   * // b.d.c: UNKNOWN,      // Invalid prop
   * // b.d.c.e.f: UNKNOWN,  // Invalid prop
   */
  const proxiedContext = setOnMissingPropStringifier(context, missingValue);

  // Return both context and its proxy so the context can be extended.
  return {
    context,
    proxiedContext,
  };
};

const createActivityTemplateContext = (
  input: {
    activity: ActivityInput;
    tracks: TrackWithMetadata[];
    playlist: { url: string; name: string };
    meta: TemplateContextMeta;
  },
  options: {
    missingValue?: string;
  } = {}
): {
  context: ActivityTemplateContext;
  proxiedContext: ActivityTemplateContext;
} => {
  const { playlist } = input;
  const { context, proxiedContext } = createPlaylistTemplateContext(
    input,
    options
  ) as {
    context: ActivityTemplateContext;
    proxiedContext: ActivityTemplateContext;
  };
  context.playlist.url = playlist.url;
  context.playlist.name = playlist.name;

  return {
    context,
    proxiedContext,
  };
};

export { createPlaylistTemplateContext, createActivityTemplateContext };
