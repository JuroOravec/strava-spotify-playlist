import type { Handlers, ServerModule, Services } from '../../lib/ServerModule';
import type {
  UserActivityPlaylistModel,
  UserActivityPlaylistInput,
  UserActivityPlaylistMeta,
} from './types';
import type { StorePlaylistData } from './data';
import assertPlaylistStore from './utils/assertPlaylistStore';

interface StorePlaylistServices extends Services {
  insertUserPlaylist: (
    userActivityPlaylist: UserActivityPlaylistInput
  ) => Promise<UserActivityPlaylistMeta | null>;
  insertUserPlaylists: (
    userActivityPlaylists: UserActivityPlaylistInput[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
  getUserPlaylistsByUser: (input: {
    internalUserId: string;
  }) => Promise<UserActivityPlaylistModel[] | null>;
  getUserPlaylistsByUsers: (
    data: {
      internalUserId: string;
    }[]
  ) => Promise<(UserActivityPlaylistModel[] | null)[]>;
  getUserPlaylistByUserAndActivity: (input: {
    internalUserId: string;
    activityProviderId: string;
    activityId: string;
  }) => Promise<UserActivityPlaylistModel | null>;
  getUserPlaylistsByUsersAndActivities: (
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ) => Promise<(UserActivityPlaylistModel | null)[]>;
  deleteUserPlaylistsByUserActivity: (data: {
    internalUserId: string;
    activityProviderId: string;
    activityId: string;
  }) => Promise<UserActivityPlaylistMeta | null>;
  deleteUserPlaylistsByUserActivities: (
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
  updateUserPlaylistTracksAssigned: (input: {
    playlistProviderId: string;
    playlistId: string;
    tracksAssigned: boolean;
  }) => Promise<UserActivityPlaylistMeta | null>;
  updateUserPlaylistsTracksAssigned: (
    data: {
      playlistProviderId: string;
      playlistId: string;
      tracksAssigned: boolean;
    }[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
}

type ThisModule = ServerModule<
  StorePlaylistServices,
  Handlers,
  StorePlaylistData
>;

const createStorePlaylistServices = (): StorePlaylistServices => {
  async function insertUserPlaylist(
    this: ThisModule,
    userActivityPlaylist: UserActivityPlaylistInput
  ): Promise<UserActivityPlaylistMeta | null> {
    const [playlist] = await this.services.insertUserPlaylists([
      userActivityPlaylist,
    ]);
    return playlist;
  }

  async function insertUserPlaylists(
    this: ThisModule,
    userActivityPlaylists: UserActivityPlaylistInput[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    if (!userActivityPlaylists.length) return [];
    assertPlaylistStore(this.data.playlistStore);
    return await this.data.playlistStore.insert(userActivityPlaylists);
  }

  async function getUserPlaylistsByUser(
    this: ThisModule,
    input: {
      internalUserId: string;
    }
  ): Promise<UserActivityPlaylistModel[] | null> {
    const [playlist] = await this.services.getUserPlaylistsByUsers([input]);
    return playlist;
  }

  async function getUserPlaylistsByUsers(
    this: ThisModule,
    data: {
      internalUserId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel[] | null)[]> {
    if (!data.length) return [];
    assertPlaylistStore(this.data.playlistStore);
    const playlists = await this.data.playlistStore.getByUsers(data);
    return playlists;
  }

  async function getUserPlaylistByUserAndActivity(
    this: ThisModule,
    input: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }
  ): Promise<UserActivityPlaylistModel | null> {
    const [
      playlist,
    ] = await this.services.getUserPlaylistsByUsersAndActivities([input]);
    return playlist;
  }

  async function getUserPlaylistsByUsersAndActivities(
    this: ThisModule,
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel | null)[]> {
    if (!data.length) return [];
    assertPlaylistStore(this.data.playlistStore);
    const playlists = await this.data.playlistStore.getByUserActivities(data);
    return playlists;
  }

  async function deleteUserPlaylistsByUserActivity(
    this: ThisModule,
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }
  ): Promise<UserActivityPlaylistMeta | null> {
    const [
      playlist = null,
    ] = await this.services.deleteUserPlaylistsByUserActivities([data]);
    return playlist;
  }

  async function deleteUserPlaylistsByUserActivities(
    this: ThisModule,
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    if (!data.length) return [];
    assertPlaylistStore(this.data.playlistStore);
    return this.data.playlistStore.deleteByUserActivities(data);
  }

  async function updateUserPlaylistTracksAssigned(
    this: ThisModule,
    input: {
      playlistProviderId: string;
      playlistId: string;
      tracksAssigned: boolean;
    }
  ): Promise<UserActivityPlaylistMeta | null> {
    const [playlist] = await this.services.updateUserPlaylistsTracksAssigned([
      input,
    ]);
    return playlist;
  }

  async function updateUserPlaylistsTracksAssigned(
    this: ThisModule,
    data: {
      playlistProviderId: string;
      playlistId: string;
      tracksAssigned: boolean;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    if (!data.length) return [];
    assertPlaylistStore(this.data.playlistStore);
    return this.data.playlistStore.updateTracksAssigned(data);
  }

  return {
    insertUserPlaylist,
    insertUserPlaylists,
    getUserPlaylistsByUser,
    getUserPlaylistsByUsers,
    getUserPlaylistByUserAndActivity,
    getUserPlaylistsByUsersAndActivities,
    deleteUserPlaylistsByUserActivity,
    deleteUserPlaylistsByUserActivities,
    updateUserPlaylistTracksAssigned,
    updateUserPlaylistsTracksAssigned,
  };
};

export default createStorePlaylistServices;
export type { StorePlaylistServices };
