import type { PlaylistStore } from '../types';

function assertPlaylistStore(
  playlistStore?: PlaylistStore | null
): asserts playlistStore {
  if (!playlistStore) {
    throw Error(`Cannot access playlist store`);
  }
}

export default assertPlaylistStore;
