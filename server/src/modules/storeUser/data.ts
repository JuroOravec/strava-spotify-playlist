import type { PGStoreOptions } from '../../lib/PGStore';
import type { UserStore } from './types';

interface StoreUserExternalData {
  clientConfig: PGStoreOptions;
}

interface StoreUserInternalData {
  userStore: UserStore | null;
}

type StoreUserData = StoreUserExternalData & StoreUserInternalData;

export { StoreUserData, StoreUserExternalData };
