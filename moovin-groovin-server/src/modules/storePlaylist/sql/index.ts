import type { QueryResultRow } from 'pg';

import type { OptionalReadonly } from '@moovin-groovin/shared';
import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';
import type { UserModel } from '../../storeUser/types';
import type {
  UserActivityPlaylistModel,
  UserActivityPlaylistMeta,
} from '../types';

interface UserActivityPlaylistResponse {
  internal_user_id: UserModel['internalUserId'];
  activity_provider_id: UserActivityPlaylistModel['activityProviderId'];
  activity_id: UserActivityPlaylistModel['activityId'];
  activity_name: UserActivityPlaylistModel['activityName'];
  playlist_provider_id: UserActivityPlaylistModel['playlistProviderId'];
  playlist_id: UserActivityPlaylistModel['playlistId'];
  playlist_url: UserActivityPlaylistModel['playlistUrl'];
  playlist_name: UserActivityPlaylistModel['playlistName'];
  date_created: UserActivityPlaylistModel['dateCreated'];
  tracks_assigned: UserActivityPlaylistModel['tracksAssigned'];
}

interface UserActivityPlaylistMetaResponse {
  internal_user_id: UserActivityPlaylistMeta['internalUserId'];
  playlist_provider_id: UserActivityPlaylistMeta['playlistProviderId'];
  playlist_id: UserActivityPlaylistMeta['playlistId'];
}

interface PlaylistStoreSQLQueries extends PGQueries {
  deleteUserActivityPlaylistsByUserActivities: [
    OptionalReadonly<
      [
        UserActivityPlaylistResponse['internal_user_id'],
        UserActivityPlaylistResponse['activity_provider_id'],
        UserActivityPlaylistResponse['activity_id']
      ]
    >[],
    UserActivityPlaylistMetaResponse
  ];
  getUserActivityPlaylistsByUsers: [
    OptionalReadonly<[UserActivityPlaylistResponse['internal_user_id']]>[],
    UserActivityPlaylistResponse | QueryResultRow
  ];
  getUserActivityPlaylistsByUserActivities: [
    OptionalReadonly<
      [
        UserActivityPlaylistResponse['internal_user_id'],
        UserActivityPlaylistResponse['activity_provider_id'],
        UserActivityPlaylistResponse['activity_id']
      ]
    >[],
    UserActivityPlaylistResponse | QueryResultRow
  ];
  insertUserActivityPlaylists: [
    Readonly<
      [
        UserActivityPlaylistResponse['internal_user_id'],
        UserActivityPlaylistResponse['activity_provider_id'],
        UserActivityPlaylistResponse['activity_id'],
        UserActivityPlaylistResponse['activity_name'] | undefined,
        UserActivityPlaylistResponse['playlist_provider_id'],
        UserActivityPlaylistResponse['playlist_id'],
        UserActivityPlaylistResponse['playlist_name'] | undefined,
        UserActivityPlaylistResponse['playlist_url'] | undefined,
        UserActivityPlaylistResponse['date_created'] | undefined,
        UserActivityPlaylistResponse['tracks_assigned'] | undefined
      ]
    >[],
    UserActivityPlaylistMetaResponse
  ];
  updateUserActivityPlaylistsTracksAssigned: [
    OptionalReadonly<
      [
        UserActivityPlaylistResponse['playlist_provider_id'],
        UserActivityPlaylistResponse['playlist_id'],
        UserActivityPlaylistResponse['activity_name'] | undefined,
        UserActivityPlaylistResponse['playlist_name'] | undefined,
        UserActivityPlaylistResponse['playlist_url'] | undefined,
        UserActivityPlaylistResponse['date_created'] | undefined,
        UserActivityPlaylistResponse['tracks_assigned'] | undefined
      ]
    >[],
    UserActivityPlaylistMetaResponse
  ];
}

const getQueries = async (): Promise<
  Record<keyof PlaylistStoreSQLQueries, string>
> => loadFilesFromDir(__dirname, ['.pgsql']);

export {
  getQueries,
  PlaylistStoreSQLQueries,
  UserActivityPlaylistResponse,
  UserActivityPlaylistMetaResponse,
};
