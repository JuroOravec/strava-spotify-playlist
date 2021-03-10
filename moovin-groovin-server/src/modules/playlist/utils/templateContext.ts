import lowerCase from 'lodash/lowerCase';

import {
  setOnMissingPropStringifierProxy,
  unixTimestampToDate,
} from '@moovin-groovin/shared';
import getActivityUrl from '../../apiStrava/utils/getActivityUrl';
import type {
  ActivityInput,
  ActivityTemplateContext,
  PlaylistTemplateContext,
  TemplateContextActivity,
  TemplateContextTrack,
  TemplateContextMeta,
  EnrichedTrack,
} from '../types';

/** Capture '01:23:45' in `2021-01-01T01:23:45.678Z"` */
const timeFromIsoDateRegex = /(?<=T).*?(?=\.)/i;

const createPlaylistTemplateContext = (input: {
  activity: ActivityInput;
  playlist: { tracks: EnrichedTrack[] };
  meta: TemplateContextMeta;
  missingValue?: string;
}): {
  context: PlaylistTemplateContext;
  proxiedContext: PlaylistTemplateContext;
} => {
  const {
    playlist,
    activity: inputActivity,
    meta,
    missingValue = 'UNKNOWN',
  } = input;
  const { tracks: inputTracks } = playlist;

  const formatDuration = (duration: number): string | undefined => {
    const isoDate = new Date(duration * 1000).toISOString();
    return isoDate.match(timeFromIsoDateRegex)?.[0];
  };

  const tracks = inputTracks.map(
    (track): TemplateContextTrack => ({
      trackId: track.trackId,
      title: track.title || missingValue,
      album: track.album || missingValue,
      artist: track.artist || missingValue,
      duration:
        (track.duration && formatDuration(track.duration)) || missingValue,
      startTime:
        (track.startTime && formatDuration(track.startTime)) || missingValue,
    })
  );

  const formattedSongs: string = tracks.length
    ? tracks
        .map((track) => `${track.startTime} ${track.title} - ${track.artist}`)
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
  const proxiedContext = setOnMissingPropStringifierProxy(
    context,
    missingValue
  );

  // Return both context and its proxy so the context can be extended.
  return {
    context,
    proxiedContext,
  };
};

const createActivityTemplateContext = (input: {
  activity: ActivityInput;
  playlist: { url: string; title: string; tracks: EnrichedTrack[] };
  meta: TemplateContextMeta;
  missingValue?: string;
}): {
  context: ActivityTemplateContext;
  proxiedContext: ActivityTemplateContext;
} => {
  const { playlist } = input;
  const { context, proxiedContext } = createPlaylistTemplateContext(input) as {
    context: ActivityTemplateContext;
    proxiedContext: ActivityTemplateContext;
  };
  context.playlist.url = playlist.url;
  context.playlist.title = playlist.title;

  return {
    context,
    proxiedContext,
  };
};

export { createPlaylistTemplateContext, createActivityTemplateContext };
