import type { UserModel } from '../storeUser/types';

/** User preferences */
export interface UserConfigModel {
  /** User Id used throughout this app */
  internalUserId: UserModel['internalUserId'];
  /** Whether user playlists should be created as collaborative */
  playlistCollaborative: boolean;
  /** Whether user playlists should be created as public */
  playlistPublic: boolean;
  /** Template for creating playlist description */
  playlistDescriptionTemplate: string | null;
  /** Template for creating playlist title */
  playlistTitleTemplate: string | null;
  /** Template for creating updated activity description that includes playlist */
  activityDescriptionTemplate: string | null;
}

export type UserConfigMeta = Pick<UserConfigModel, 'internalUserId'>;
export type UserConfigInput = UserConfigModel;
export type UserConfigUpdateInput = Pick<UserConfigModel, 'internalUserId'> &
  Partial<Omit<UserConfigModel, 'internalUserId'>>;

export interface ConfigStore {
  install: () => Promise<void>;
  close: () => Promise<void>;
  get: (internalUserIds: string[]) => Promise<(UserConfigModel | null)[]>;
  insert: (configs: UserConfigInput[]) => Promise<(UserConfigMeta | null)[]>;
  update: (
    configs: UserConfigUpdateInput[]
  ) => Promise<(UserConfigMeta | null)[]>;
}

export type UserConfig = Omit<UserConfigModel, 'internalUserId'>;
