import type { UserModel } from '../storeUser/types';

export interface UserActivityPlaylistModel {
  internalUserId: UserModel['internalUserId'];
  stravaActivityId: string;
  spotifyPlaylistId: string;
  spotifyPlaylistUri: string;
  /** Whether tracks have been assigned to this playlist */
  tracksAssigned: boolean;
}

export type UserActivityPlaylistMeta = Pick<
  UserActivityPlaylistModel,
  'spotifyPlaylistId' | 'internalUserId'
>;
export type UserActivityPlaylistInput = Pick<
  UserActivityPlaylistModel,
  | 'internalUserId'
  | 'stravaActivityId'
  | 'spotifyPlaylistId'
  | 'spotifyPlaylistUri'
> &
  Partial<Pick<UserActivityPlaylistModel, 'tracksAssigned'>>;

export interface PlaylistStore {
  install: () => Promise<void>;
  close: () => Promise<void>;
  insert: (
    userActivityPlaylistData: UserActivityPlaylistInput[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
  getByUserActivities: (
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ) => Promise<(UserActivityPlaylistModel | null)[]>;
  deleteByUserActivities: (
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
  updateTracksAssigned: (
    data: {
      spotifyPlaylistId: string;
      tracksAssigned: boolean;
    }[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
}
