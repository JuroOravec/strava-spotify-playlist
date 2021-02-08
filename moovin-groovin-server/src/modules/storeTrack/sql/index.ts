import type { QueryResultRow } from 'pg';

import type { OptionalReadonly } from '@moovin-groovin/shared';
import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';
import type { UserTrackModel, UserTrackMeta } from '../types';

interface UserTrackResponse {
  internal_user_id: UserTrackModel['internalUserId'];
  spotify_track_id: UserTrackModel['spotifyTrackId'];
  spotify_track_uri: UserTrackModel['spotifyTrackUri'];
  start_time: UserTrackModel['startTime'];
}

interface UserTrackMetaResponse {
  internal_user_id: UserTrackMeta['internalUserId'];
  spotify_track_uri: UserTrackMeta['spotifyTrackUri'];
  start_time: UserTrackMeta['startTime'];
}

interface TrackStoreSQLQueries extends PGQueries {
  createUserTrackTable: [[], QueryResultRow];
  deleteUserTracksOlderThan: [
    [UserTrackResponse['start_time']],
    UserTrackMetaResponse
  ];
  getUserTracksByRanges: [
    OptionalReadonly<
      [
        UserTrackResponse['internal_user_id'],
        UserTrackResponse['start_time'],
        UserTrackResponse['start_time']
      ]
    >[],
    UserTrackResponse
  ];
  upsertUserTracks: [
    OptionalReadonly<
      [
        UserTrackResponse['internal_user_id'],
        UserTrackResponse['spotify_track_id'],
        UserTrackResponse['spotify_track_uri'],
        UserTrackResponse['start_time']
      ]
    >[],
    UserTrackMetaResponse
  ];
}

const getQueries = async (): Promise<
  Record<keyof TrackStoreSQLQueries, string>
> => loadFilesFromDir(__dirname, ['.pgsql']);

export {
  getQueries,
  TrackStoreSQLQueries,
  UserTrackResponse,
  UserTrackMetaResponse,
};
