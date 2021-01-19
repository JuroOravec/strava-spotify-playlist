import type { PGStore } from 'connect-pg-simple';

import type { PGStoreOptions } from '../../lib/PGStore';
import type { SessionStore } from './types';

interface StoreSessionExternalData {
  clientConfig: PGStoreOptions;
}

interface StoreSessionInternalData {
  sessionStore: SessionStore | null;
  expressSessionStore: PGStore | null;
}

type StoreSessionData = StoreSessionExternalData & StoreSessionInternalData;

export { StoreSessionData, StoreSessionExternalData };
