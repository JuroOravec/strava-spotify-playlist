import type { Handlers, ServerModule, Services } from '../../lib/ServerModule';
import type {
  UserTrackModel,
  UserTrackRangesInput,
  PlaylistTrackModel,
  PlaylistTrackInputByPlaylist,
  TrackModel,
  TrackInput,
  TrackMeta,
} from './types';
import type { StoreTrackData } from './data';
import assertTrackStore from './utils/assertTrackStore';

interface StoreTrackServices extends Services {
  deleteUserTracksOlderThan: (
    timestamp: number
  ) => Promise<UserTrackModel[] | null>;
  getPlaylistTracksByPlaylist: (
    input: PlaylistTrackInputByPlaylist
  ) => Promise<PlaylistTrackModel[] | null>;
  getPlaylistTracksByPlaylists: (
    input: PlaylistTrackInputByPlaylist[]
  ) => Promise<(PlaylistTrackModel[] | null)[]>;
  getTrack: (input: TrackInput) => Promise<TrackModel[] | null>;
  getTracks: (input: TrackInput[]) => Promise<(TrackModel[] | null)[]>;
  getUserTracksByRange: (
    input: UserTrackRangesInput
  ) => Promise<UserTrackModel[] | null>;
  getUserTracksByRanges: (
    input: UserTrackRangesInput[]
  ) => Promise<(UserTrackModel[] | null)[]>;
  upsertPlaylistTracks: (
    playlistTracks: PlaylistTrackModel[]
  ) => Promise<(PlaylistTrackModel | null)[]>;
  upsertTracks: (tracks: TrackModel[]) => Promise<(TrackMeta | null)[]>;
  upsertUserTracks: (
    userTracks: UserTrackModel[]
  ) => Promise<(UserTrackModel | null)[]>;
}

type ThisModule = ServerModule<StoreTrackServices, Handlers, StoreTrackData>;

const createStoreTrackServices = (): StoreTrackServices => {
  async function deleteUserTracksOlderThan(
    this: ThisModule,
    timestamp: number
  ): Promise<UserTrackModel[] | null> {
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.deleteUserTracksOlderThan(timestamp);
  }

  async function getPlaylistTracksByPlaylist(
    this: ThisModule,
    input: PlaylistTrackInputByPlaylist
  ): Promise<PlaylistTrackModel[] | null> {
    const [result = null] = await this.services.getPlaylistTracksByPlaylists([
      input,
    ]);
    return result;
  }

  async function getPlaylistTracksByPlaylists(
    this: ThisModule,
    input: PlaylistTrackInputByPlaylist[]
  ): Promise<(PlaylistTrackModel[] | null)[]> {
    if (!input.length) return [];
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.getPlaylistTracksByPlaylists(input);
  }

  async function getTrack(
    this: ThisModule,
    input: TrackInput
  ): Promise<TrackModel[] | null> {
    const [result = null] = await this.services.getTracks([input]);
    return result;
  }

  async function getTracks(
    this: ThisModule,
    input: TrackInput[]
  ): Promise<(TrackModel[] | null)[]> {
    if (!input.length) return [];
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.getTracks(input);
  }

  async function getUserTracksByRange(
    this: ThisModule,
    input: UserTrackRangesInput
  ): Promise<UserTrackModel[] | null> {
    const [result = null] = await this.services.getUserTracksByRanges([input]);
    return result;
  }

  async function getUserTracksByRanges(
    this: ThisModule,
    input: UserTrackRangesInput[]
  ): Promise<(UserTrackModel[] | null)[]> {
    if (!input.length) return [];
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.getUserTracksByRanges(input);
  }

  async function upsertPlaylistTracks(
    this: ThisModule,
    playlistTracks: PlaylistTrackModel[]
  ): Promise<(PlaylistTrackModel | null)[]> {
    if (!playlistTracks.length) return [];
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.upsertPlaylistTracks(playlistTracks);
  }

  async function upsertTracks(
    this: ThisModule,
    tracks: TrackModel[]
  ): Promise<(TrackModel | null)[]> {
    if (!tracks.length) return [];
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.upsertTracks(tracks);
  }

  async function upsertUserTracks(
    this: ThisModule,
    userTracks: UserTrackModel[]
  ): Promise<(UserTrackModel | null)[]> {
    if (!userTracks.length) return [];
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.upsertUserTracks(userTracks);
  }

  return {
    deleteUserTracksOlderThan,
    getPlaylistTracksByPlaylist,
    getPlaylistTracksByPlaylists,
    getTrack,
    getTracks,
    getUserTracksByRange,
    getUserTracksByRanges,
    upsertPlaylistTracks,
    upsertTracks,
    upsertUserTracks,
  };
};

export default createStoreTrackServices;
export type { StoreTrackServices };
