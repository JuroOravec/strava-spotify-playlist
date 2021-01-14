import { QueryResultRow } from 'pg';
import uniqWith from 'lodash/uniqWith';
import isNil from 'lodash/isNil';
import groupBy from 'lodash/groupBy';

import logger from '../../../lib/logger';
import PGStore from '../../../lib/PGStore';
import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import unixTimestamp from '../../../utils/unixTimestamp';
import type {
  UserTrackModel,
  UserTrackMeta,
  TrackStore,
  UserTrackInput,
  UserTrackRangesInput,
} from '../types';
import {
  getQueries,
  TrackStoreSQLQueries,
  UserTrackMetaResponse,
  UserTrackResponse,
} from '../sql';

const transformUserTrackMetaResponse = (
  userTrack: UserTrackMetaResponse
): UserTrackMeta => ({
  internalUserId: userTrack.internal_user_id,
  spotifyTrackUri: userTrack.spotify_track_uri,
  startTime: Number.parseInt(userTrack.start_time as any),
});

const transformUserTrackResponse = (
  userTrack: UserTrackResponse
): UserTrackModel => ({
  ...transformUserTrackMetaResponse(userTrack as UserTrackMetaResponse),
  spotifyTrackId: userTrack.spotify_track_id,
});

const dedupeUserTrackInput = (
  userTrackData: UserTrackInput[]
): UserTrackInput[] => {
  // Dedupe keep the last version on conflict
  const dedupedReversed = uniqWith(
    [...userTrackData].reverse(),
    (userTrackA, userTrackB) =>
      userTrackA.internalUserId === userTrackB.internalUserId &&
      userTrackA.spotifyTrackId === userTrackB.spotifyTrackId &&
      userTrackA.startTime === userTrackB.startTime
  );
  return dedupedReversed.reverse();
};

const isUserTrackResponse = (
  token: UserTrackResponse | QueryResultRow
): token is UserTrackResponse =>
  !isNil(token?.internal_user_id) &&
  !isNil(token?.spotify_track_id) &&
  !isNil(token?.start_time);

class PGTTrackStore
  extends PGStore<TrackStoreSQLQueries>
  implements TrackStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
    await this.query('createUserTrackTable');
  }

  async getByRanges(
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

  async upsert(
    userTrackData: UserTrackModel[]
  ): Promise<(UserTrackMeta | null)[]> {
    const values = dedupeUserTrackInput(userTrackData).map(
      (userTrack) =>
        [
          userTrack.internalUserId,
          userTrack.spotifyTrackId,
          userTrack.spotifyTrackUri,
          userTrack.startTime,
        ] as const
    );

    const { rows: ids } = await this.query(
      'upsertUserTracks',
      values,
      transformUserTrackMetaResponse
    );

    const serializeKey = (d: UserTrackMeta) =>
      `${d.internalUserId}__${d.spotifyTrackUri}__${d.startTime}`;

    return alignResultWithInput({
      input: { value: userTrackData, alignBy: serializeKey },
      result: { value: ids, alignBy: serializeKey },
      missing: null,
    });
  }

  async deleteOlderThan(timestamp: number): Promise<UserTrackMeta[] | null> {
    const { rows: userTracks } = await this.query(
      'deleteUserTracksOlderThan',
      [timestamp],
      transformUserTrackMetaResponse
    );

    return userTracks.length ? userTracks : null;
  }
}

export default PGTTrackStore;
