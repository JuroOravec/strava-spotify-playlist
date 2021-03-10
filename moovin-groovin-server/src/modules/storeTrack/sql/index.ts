import type { OptionalReadonly } from '@moovin-groovin/shared';
import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';
import type {
  TrackMeta,
  TrackModel,
  UserTrackModel,
  PlaylistTrackModel,
} from '../types';

interface UserTrackResponse {
  internal_user_id: UserTrackModel['internalUserId'];
  playlist_provider_id: UserTrackModel['playlistProviderId'];
  track_id: UserTrackModel['trackId'];
  start_time: UserTrackModel['startTime'];
}

interface TrackResponse {
  playlist_provider_id: TrackModel['playlistProviderId'];
  track_id: TrackModel['trackId'];
  title: TrackModel['title'];
  album: TrackModel['album'];
  artist: TrackModel['artist'];
  duration: TrackModel['duration'];
}

interface TrackResponseMeta {
  playlist_provider_id: TrackMeta['playlistProviderId'];
  track_id: TrackMeta['trackId'];
}

interface PlaylistTrackResponse {
  playlist_provider_id: PlaylistTrackModel['playlistProviderId'];
  playlist_id: PlaylistTrackModel['playlistId'];
  track_id: PlaylistTrackModel['trackId'];
  start_time: PlaylistTrackModel['startTime'];
}

interface TrackStoreSQLQueries extends PGQueries {
  deleteUserTracksOlderThan: [
    [UserTrackResponse['start_time']],
    UserTrackResponse
  ];
  getPlaylistTracksByPlaylists: [
    OptionalReadonly<
      [
        PlaylistTrackResponse['playlist_provider_id'],
        PlaylistTrackResponse['playlist_id']
      ]
    >[],
    PlaylistTrackResponse
  ];
  getTracks: [
    OptionalReadonly<
      [TrackResponse['playlist_provider_id'], TrackResponse['track_id']]
    >[],
    TrackResponse
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
  upsertPlaylistTracks: [
    OptionalReadonly<
      [
        PlaylistTrackResponse['playlist_provider_id'],
        PlaylistTrackResponse['playlist_id'],
        PlaylistTrackResponse['track_id'],
        PlaylistTrackResponse['start_time']
      ]
    >[],
    PlaylistTrackResponse
  ];
  upsertTracks: [
    OptionalReadonly<
      [
        TrackResponse['playlist_provider_id'],
        TrackResponse['track_id'],
        TrackResponse['title'],
        TrackResponse['album'],
        TrackResponse['artist'],
        TrackResponse['duration']
      ]
    >[],
    TrackResponseMeta
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

export {
  getQueries,
  TrackStoreSQLQueries,
  UserTrackResponse,
  PlaylistTrackResponse,
  TrackResponse,
  TrackResponseMeta,
};
