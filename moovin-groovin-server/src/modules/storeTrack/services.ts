import logger from '../../lib/logger';
import type { ServerModule, Services } from '../../lib/ServerModule';
import type {
  UserTrackModel,
  UserTrackMeta,
  UserTrackRangesInput,
} from './types';
import type { StoreTrackData } from './data';
import assertTrackStore from './utils/assertTrackStore';

interface StoreTrackServices extends Services {
  upsertUserTracks: (
    userTracks: UserTrackModel[]
  ) => Promise<(UserTrackMeta | null)[]>;
  getUserTracksByRange: (
    input: UserTrackRangesInput
  ) => Promise<UserTrackModel[] | null>;
  getUserTracksByRanges: (
    input: UserTrackRangesInput[]
  ) => Promise<(UserTrackModel[] | null)[]>;
  deleteUserTracksOlderThan: (
    timestamp: number
  ) => Promise<UserTrackMeta[] | null>;
}

type ThisModule = ServerModule<StoreTrackServices, any, StoreTrackData>;

const createStoreTrackServices = (): StoreTrackServices => {
  async function upsertUserTracks(
    this: ThisModule,
    userTracks: UserTrackModel[]
  ): Promise<(UserTrackMeta | null)[]> {
    if (!userTracks.length) return [];
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.upsert(userTracks);
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
    return this.data.trackStore.getByRanges(input);
  }

  async function deleteUserTracksOlderThan(
    this: ThisModule,
    timestamp: number
  ): Promise<UserTrackMeta[] | null> {
    assertTrackStore(this.data.trackStore);
    return this.data.trackStore.deleteOlderThan(timestamp);
  }

  return {
    upsertUserTracks,
    getUserTracksByRange,
    getUserTracksByRanges,
    deleteUserTracksOlderThan,
  };
};

export default createStoreTrackServices;
export type { StoreTrackServices };
