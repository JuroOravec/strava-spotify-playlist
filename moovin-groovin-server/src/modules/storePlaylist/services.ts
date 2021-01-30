import logger from '../../lib/logger';
import type { ServerModule, Services } from '../../lib/ServerModule';
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
  getUserPlaylistByUserAndActivity: (
    internalUserId: string,
    stravaActivityId: string
  ) => Promise<UserActivityPlaylistModel | null>;
  getUserPlaylistsByUsersAndActivities: (
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ) => Promise<(UserActivityPlaylistModel | null)[]>;
  deleteUserPlaylistByUserActivity: (data: {
    internalUserId: string;
    stravaActivityId: string;
  }) => Promise<UserActivityPlaylistMeta | null>;
  deleteUserPlaylistsByUserActivities: (
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
  updateUserPlaylistTracksAssigned: (
    spotifyPlaylistId: string,
    tracksAssigned: boolean
  ) => Promise<UserActivityPlaylistMeta | null>;
  updateUserPlaylistsTracksAssigned: (
    data: {
      spotifyPlaylistId: string;
      tracksAssigned: boolean;
    }[]
  ) => Promise<(UserActivityPlaylistMeta | null)[]>;
}

type ThisModule = ServerModule<StorePlaylistServices, any, StorePlaylistData>;

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

  async function getUserPlaylistByUserAndActivity(
    this: ThisModule,
    internalUserId: string,
    stravaActivityId: string
  ): Promise<UserActivityPlaylistModel | null> {
    const [
      playlist,
    ] = await this.services.getUserPlaylistsByUsersAndActivities([
      { internalUserId, stravaActivityId },
    ]);
    return playlist;
  }

  async function getUserPlaylistsByUsersAndActivities(
    this: ThisModule,
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel | null)[]> {
    if (!data.length) return [];
    assertPlaylistStore(this.data.playlistStore);
    const playlists = await this.data.playlistStore.getByUserActivities(data);
    return playlists;
  }

  async function deleteUserPlaylistByUserActivity(
    this: ThisModule,
    data: {
      internalUserId: string;
      stravaActivityId: string;
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
      stravaActivityId: string;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    if (!data.length) return [];
    assertPlaylistStore(this.data.playlistStore);
    return this.data.playlistStore.deleteByUserActivities(data);
  }

  async function updateUserPlaylistTracksAssigned(
    this: ThisModule,
    spotifyPlaylistId: string,
    tracksAssigned: boolean
  ): Promise<UserActivityPlaylistMeta | null> {
    const [playlist] = await this.services.updateUserPlaylistsTracksAssigned([
      {
        spotifyPlaylistId,
        tracksAssigned,
      },
    ]);
    return playlist;
  }

  async function updateUserPlaylistsTracksAssigned(
    this: ThisModule,
    data: {
      spotifyPlaylistId: string;
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
    getUserPlaylistByUserAndActivity,
    getUserPlaylistsByUsersAndActivities,
    deleteUserPlaylistByUserActivity,
    deleteUserPlaylistsByUserActivities,
    updateUserPlaylistTracksAssigned,
    updateUserPlaylistsTracksAssigned,
  };
};

export default createStorePlaylistServices;
export type { StorePlaylistServices };
