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
  strava_activity_id: UserActivityPlaylistModel['stravaActivityId'];
  spotify_playlist_id: UserActivityPlaylistModel['spotifyPlaylistId'];
  spotify_playlist_uri: UserActivityPlaylistModel['spotifyPlaylistUri'];
  tracks_assigned: UserActivityPlaylistModel['tracksAssigned'];
}

interface UserActivityPlaylistMetaResponse {
  internal_user_id: UserActivityPlaylistMeta['internalUserId'];
  spotify_playlist_id: UserActivityPlaylistMeta['spotifyPlaylistId'];
}

interface PlaylistStoreSQLQueries extends PGQueries {
  createUserActivityPlaylistTable: [[], QueryResultRow];
  deleteUserActivityPlaylistsByUserActivities: [
    OptionalReadonly<
      [
        UserActivityPlaylistResponse['internal_user_id'],
        UserActivityPlaylistResponse['strava_activity_id']
      ]
    >[],
    UserActivityPlaylistMetaResponse
  ];
  getUserActivityPlaylistsByUserActivities: [
    OptionalReadonly<
      [
        UserActivityPlaylistResponse['internal_user_id'],
        UserActivityPlaylistResponse['strava_activity_id']
      ]
    >[],
    UserActivityPlaylistResponse | QueryResultRow
  ];
  insertUserActivityPlaylists: [
    Readonly<
      [
        UserActivityPlaylistResponse['internal_user_id'],
        UserActivityPlaylistResponse['strava_activity_id'],
        UserActivityPlaylistResponse['spotify_playlist_id'],
        UserActivityPlaylistResponse['spotify_playlist_uri'],
        UserActivityPlaylistResponse['tracks_assigned'] | undefined
      ]
    >[],
    UserActivityPlaylistMetaResponse
  ];
  updateUserActivityPlaylistsTracksAssigned: [
    OptionalReadonly<
      [
        UserActivityPlaylistResponse['spotify_playlist_id'],
        UserActivityPlaylistResponse['tracks_assigned']
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
