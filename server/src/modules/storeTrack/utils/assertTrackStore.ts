import type { TrackStore } from '../types';

function assertTrackStore(trackStore?: TrackStore | null): asserts trackStore {
  if (!trackStore) {
    throw Error(`Cannot access track store`);
  }
}

export default assertTrackStore;
