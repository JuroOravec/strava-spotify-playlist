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
} from '../types';
import { getQueries, TrackStoreSQLQueries, UserTrackResponse } from '../sql';

const transformUserTrackResponse = (
  userTrack: UserTrackResponse
): UserTrackModel => ({
  internalUserId: userTrack.internal_user_id,
  playlistProviderId: userTrack.playlist_provider_id,
  trackId: userTrack.track_id,
  startTime:
    typeof userTrack.start_time === 'number'
      ? userTrack.start_time
      : Number.parseInt(userTrack.start_time),
});

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

const isUserTrackResponse = (
  token: UserTrackResponse | QueryResultRow
): token is UserTrackResponse =>
  !isNil(token?.internal_user_id) &&
  !isNil(token?.playlist_provider_id) &&
  !isNil(token?.track_id) &&
  !isNil(token?.start_time);

class PGTTrackStore
  extends PGStore<TrackStoreSQLQueries>
  implements TrackStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
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

  async deleteOlderThan(timestamp: number): Promise<UserTrackModel[] | null> {
    const { rows: userTracks } = await this.query(
      'deleteUserTracksOlderThan',
      [timestamp],
      transformUserTrackResponse
    );

    return userTracks.length ? userTracks : null;
  }
}

export default PGTTrackStore;
