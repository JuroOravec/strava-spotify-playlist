import type { PGStoreOptions } from '../../lib/PGStore';
import type { TrackStore } from './types';

interface StoreTrackExternalData {
  clientConfig: PGStoreOptions;
}

interface StoreTrackInternalData {
  trackStore: TrackStore | null;
}

type StoreTrackData = StoreTrackExternalData & StoreTrackInternalData;

export { StoreTrackData, StoreTrackExternalData };
