import { QueryResultRow } from 'pg';
import uniqWith from 'lodash/uniqWith';
import isNil from 'lodash/isNil';
import groupBy from 'lodash/groupBy';

import PGStore from '../../../lib/PGStore';
import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import unixTimestamp from '../../../utils/unixTimestamp';
import type {
  UserTrackModel,
  TrackStore,
  UserTrackInput,
  UserTrackRangesInput,
  PlaylistTrackInputByPlaylist,
  PlaylistTrackModel,
  PlaylistTrackInput,
  TrackInput,
  TrackModel,
  TrackMeta,
} from '../types';
import {
  getQueries,
  TrackStoreSQLQueries,
  UserTrackResponse,
  PlaylistTrackResponse,
  TrackResponse,
  TrackResponseMeta,
} from '../sql';

const parseStartTime = (startTime: string | number) =>
  typeof startTime === 'number' ? startTime : Number.parseInt(startTime);

const transformTrackMetaResponse = (track: TrackResponseMeta): TrackMeta => ({
  playlistProviderId: track.playlist_provider_id,
  trackId: track.track_id,
});

const transformTrackResponse = (track: TrackResponse): TrackModel => ({
  ...transformTrackMetaResponse(track),
  title: track.title,
  album: track.album,
  artist: track.artist,
  duration: !isNil(track.duration) ? parseStartTime(track.duration) : undefined,
});

const transformUserTrackResponse = (
  userTrack: UserTrackResponse
): UserTrackModel => ({
  internalUserId: userTrack.internal_user_id,
  playlistProviderId: userTrack.playlist_provider_id,
  trackId: userTrack.track_id,
  startTime: parseStartTime(userTrack.start_time),
});

const transformPlaylistTrackResponse = (
  playlistTrack: PlaylistTrackResponse
): PlaylistTrackModel => ({
  playlistProviderId: playlistTrack.playlist_provider_id,
  playlistId: playlistTrack.playlist_id,
  trackId: playlistTrack.track_id,
  startTime: parseStartTime(playlistTrack.start_time),
});

const dedupePlaylistTrackInput = (
  playlistTrackData: PlaylistTrackInput[]
): PlaylistTrackInput[] => {
  // Dedupe keep the last version on conflict
  const dedupedReversed = uniqWith(
    [...playlistTrackData].reverse(),
    (playlistTrackA, playlistTrackB) =>
      playlistTrackA.playlistProviderId === playlistTrackB.playlistProviderId &&
      playlistTrackA.playlistId === playlistTrackB.playlistId &&
      playlistTrackA.trackId === playlistTrackB.trackId &&
      playlistTrackA.startTime === playlistTrackB.startTime
  );
  return dedupedReversed.reverse();
};

const dedupeTrackInput = <T extends TrackInput>(trackData: T[]): T[] => {
  // Dedupe keep the last version on conflict
  const dedupedReversed = uniqWith(
    [...trackData].reverse(),
    (trackA, trackB) =>
      trackA.playlistProviderId === trackB.playlistProviderId &&
      trackA.trackId === trackB.trackId
  );
  return dedupedReversed.reverse();
};

const dedupeUserTrackInput = (
  userTrackData: UserTrackInput[]
): UserTrackInput[] => {
  // Dedupe keep the last version on conflict
  const dedupedReversed = uniqWith(
    [...userTrackData].reverse(),
    (userTrackA, userTrackB) =>
      userTrackA.internalUserId === userTrackB.internalUserId &&
      userTrackA.playlistProviderId === userTrackB.playlistProviderId &&
      userTrackA.trackId === userTrackB.trackId &&
      userTrackA.startTime === userTrackB.startTime
  );
  return dedupedReversed.reverse();
};

const isTrackResponse = (
  track: TrackResponse | QueryResultRow
): track is TrackResponse =>
  !isNil(track?.playlist_provider_id) && !isNil(track?.track_id);

const isUserTrackResponse = (
  track: UserTrackResponse | QueryResultRow
): track is UserTrackResponse =>
  !isNil(track?.internal_user_id) &&
  !isNil(track?.playlist_provider_id) &&
  !isNil(track?.track_id) &&
  !isNil(track?.start_time);

const isPlaylistTrackResponse = (
  track: PlaylistTrackResponse | QueryResultRow
): track is PlaylistTrackResponse =>
  !isNil(track?.playlist_provider_id) &&
  !isNil(track?.playlist_id) &&
  !isNil(track?.track_id) &&
  !isNil(track?.start_time);

class PGTTrackStore
  extends PGStore<TrackStoreSQLQueries>
  implements TrackStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
  }

  async deleteUserTracksOlderThan(
    timestamp: number
  ): Promise<UserTrackModel[] | null> {
    const { rows: userTracks } = await this.query(
      'deleteUserTracksOlderThan',
      [timestamp],
      transformUserTrackResponse
    );

    return userTracks.length ? userTracks : null;
  }

  async getPlaylistTracksByPlaylists(
    input: PlaylistTrackInputByPlaylist[]
  ): Promise<(PlaylistTrackModel[] | null)[]> {
    const { rows: tracks } = await this.query(
      'getPlaylistTracksByPlaylists',
      input.map((d) => [d.playlistProviderId, d.playlistId] as const),
      (track) =>
        isPlaylistTrackResponse(track)
          ? transformPlaylistTrackResponse(track)
          : null
    );

    const alignKey = (input: PlaylistTrackInputByPlaylist) =>
      `${input.playlistProviderId}__${input.playlistId}`;

    const groups = Object.entries(
      groupBy(tracks, (val) => (isNil(val) ? 'null' : alignKey(val)))
    ) as [string, PlaylistTrackModel[] | null][];

    return alignResultWithInput({
      input: { value: input, alignBy: alignKey },
      result: { value: groups, alignBy: ([key]) => key },
      missing: null,
    }).map((keyValOrNull) => (keyValOrNull ? keyValOrNull[1] : null));
  }

  async getTracks(input: TrackInput[]): Promise<(TrackModel[] | null)[]> {
    const { rows: tracks } = await this.query(
      'getTracks',
      input.map((d) => [d.playlistProviderId, d.trackId] as const),
      (track) => (isTrackResponse(track) ? transformTrackResponse(track) : null)
    );

    const alignKey = (input: TrackInput) =>
      `${input.playlistProviderId}__${input.trackId}`;

    const groups = Object.entries(
      groupBy(tracks, (val) => (isNil(val) ? 'null' : alignKey(val)))
    ) as [string, TrackModel[] | null][];

    return alignResultWithInput({
      input: { value: input, alignBy: alignKey },
      result: { value: groups, alignBy: ([key]) => key },
      missing: null,
    }).map((keyValOrNull) => (keyValOrNull ? keyValOrNull[1] : null));
  }

  async getUserTracksByRanges(
    input: UserTrackRangesInput[]
  ): Promise<(UserTrackModel[] | null)[]> {
    const { rows: tracks } = await this.query(
      'getUserTracksByRanges',
      input.map(
        (d) =>
          [d.internalUserId, d.after ?? 0, d.before ?? unixTimestamp()] as const
      ),
      (track) =>
        isUserTrackResponse(track) ? transformUserTrackResponse(track) : null
    );

    const groups = Object.entries(
      groupBy(tracks, (val) => (isNil(val) ? 'null' : val.internalUserId))
    ) as [string, UserTrackModel[] | null][];

    return alignResultWithInput({
      input: { value: input, alignBy: (d) => d.internalUserId },
      result: { value: groups, alignBy: ([key]) => key },
      missing: null,
    }).map((keyValOrNull) => (keyValOrNull ? keyValOrNull[1] : null));
  }

  async upsertPlaylistTracks(
    playlistTrackData: PlaylistTrackModel[]
  ): Promise<(PlaylistTrackModel | null)[]> {
    const values = dedupePlaylistTrackInput(playlistTrackData).map(
      (playlistTrack) =>
        [
          playlistTrack.playlistProviderId,
          playlistTrack.playlistId,
          playlistTrack.trackId,
          playlistTrack.startTime,
        ] as const
    );

    const { rows: ids } = await this.query(
      'upsertPlaylistTracks',
      values,
      transformPlaylistTrackResponse
    );

    const alignBy = (d: PlaylistTrackModel) =>
      `${d.playlistProviderId}__${d.playlistId}__${d.trackId}__${d.startTime}`;

    return alignResultWithInput({
      input: { value: playlistTrackData, alignBy },
      result: { value: ids, alignBy },
      missing: null,
    });
  }

  async upsertTracks(trackData: TrackModel[]): Promise<(TrackModel | null)[]> {
    const values = dedupeTrackInput(trackData).map(
      (track) =>
        [
          track.playlistProviderId,
          track.trackId,
          track.title,
          track.album,
          track.artist,
          track.duration,
        ] as const
    );

    const { rows: ids } = await this.query(
      'upsertTracks',
      values,
      transformTrackMetaResponse
    );

    const alignBy = (d: TrackMeta) => `${d.playlistProviderId}__${d.trackId}`;

    return alignResultWithInput({
      input: { value: trackData, alignBy },
      result: { value: ids, alignBy },
      missing: null,
    });
  }

  async upsertUserTracks(
    userTrackData: UserTrackModel[]
  ): Promise<(UserTrackModel | null)[]> {
    const values = dedupeUserTrackInput(userTrackData).map(
      (userTrack) =>
        [
          userTrack.internalUserId,
          userTrack.playlistProviderId,
          userTrack.trackId,
          userTrack.startTime,
        ] as const
    );

    const { rows: ids } = await this.query(
      'upsertUserTracks',
      values,
      transformUserTrackResponse
    );

    const serializeKey = (d: UserTrackModel) =>
      `${d.internalUserId}__${d.playlistProviderId}__${d.trackId}__${d.startTime}`;

    return alignResultWithInput({
      input: { value: userTrackData, alignBy: serializeKey },
      result: { value: ids, alignBy: serializeKey },
      missing: null,
    });
  }
}

export default PGTTrackStore;
