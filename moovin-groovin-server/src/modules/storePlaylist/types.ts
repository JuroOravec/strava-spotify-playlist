import { ServerModuleName } from 'src/types';
import type AppServerModules from 'src/types/AppServerModules';
import type { UserModel } from '../storeUser/types';

export type StorePlaylistDeps = Pick<
  AppServerModules,
  ServerModuleName.STORE_USER
>;

export interface UserActivityPlaylistModel {
  internalUserId: UserModel['internalUserId'];
  activityProviderId: string;
  activityId: string;
  activityName?: string;
  playlistProviderId: string;
  playlistId: string;
  playlistUrl: string;
  playlistName?: string;
  dateCreated: number;
  /** Whether tracks have been assigned to this playlist */
  tracksAssigned: boolean;
}

export type UserActivityPlaylistMeta = Pick<
  UserActivityPlaylistModel,
  'playlistProviderId' | 'playlistId' | 'internalUserId'
>;
export type UserActivityPlaylistInput = Pick<
  UserActivityPlaylistModel,
  | 'internalUserId'
  | 'activityProviderId'
  | 'activityId'
  | 'playlistProviderId'
  | 'playlistId'
  | 'playlistUrl'
  | 'dateCreated'
> &
  Partial<
    Pick<
      UserActivityPlaylistModel,
      'tracksAssigned' | 'activityName' | 'playlistName'
    >
  >;
export type UserActivityPlaylistUpdate = Pick<
  UserActivityPlaylistModel,
  'playlistProviderId' | 'playlistId'
> &
  Partial<
    Pick<
      UserActivityPlaylistModel,
      | 'activityName'
      | 'playlistName'
      | 'playlistUrl'
      | 'dateCreated'
      | 'tracksAssigned'
    >
  >;

export interface PlaylistStore {
  install: () => Promise<void>;
  close: () => Promise<void>;
  insert: (
    userActivityPlaylistData: UserActivityPlaylistInput[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
  getByUsers(
    input: {
      internalUserId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel[] | null)[]>;
  getByUserActivities: (
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ) => Promise<(UserActivityPlaylistModel | null)[]>;
  deleteByUserActivities: (
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
  updateTracksAssigned: (
    data: {
      playlistProviderId: string;
      playlistId: string;
      tracksAssigned: boolean;
    }[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
  update: (
    data: UserActivityPlaylistUpdate[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
}
