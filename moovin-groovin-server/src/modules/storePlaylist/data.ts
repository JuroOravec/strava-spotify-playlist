import type { PGStoreOptions } from '../../lib/PGStore';
import type { PlaylistStore } from './types';

interface StorePlaylistExternalData {
  clientConfig: PGStoreOptions;
}

interface StorePlaylistInternalData {
  playlistStore: PlaylistStore | null;
}

type StorePlaylistData = StorePlaylistExternalData & StorePlaylistInternalData;

export { StorePlaylistData, StorePlaylistExternalData };
