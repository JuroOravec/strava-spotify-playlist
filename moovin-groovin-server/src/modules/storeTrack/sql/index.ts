import type { OptionalReadonly } from '@moovin-groovin/shared';
import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';
import type { UserTrackModel } from '../types';

interface UserTrackResponse {
  internal_user_id: UserTrackModel['internalUserId'];
  playlist_provider_id: UserTrackModel['playlistProviderId'];
  track_id: UserTrackModel['trackId'];
  start_time: UserTrackModel['startTime'];
}

interface TrackStoreSQLQueries extends PGQueries {
  deleteUserTracksOlderThan: [
    [UserTrackResponse['start_time']],
    UserTrackResponse
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
        UserTrackResponse['playlist_provider_id'],
        UserTrackResponse['track_id'],
        UserTrackResponse['start_time']
      ]
    >[],
    UserTrackResponse
  ];
}

const getQueries = async (): Promise<
  Record<keyof TrackStoreSQLQueries, string>
> => loadFilesFromDir(__dirname, ['.pgsql']);

export { getQueries, TrackStoreSQLQueries, UserTrackResponse };
