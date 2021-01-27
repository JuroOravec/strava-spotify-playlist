import type { PGStoreOptions } from '../../lib/PGStore';
import type { TokenStore } from './types';

interface StoreTokenExternalData {
  clientConfig: PGStoreOptions;
}
interface StoreTokenInternalData {
  tokenStore: TokenStore | null;
}

type StoreTokenData = StoreTokenExternalData & StoreTokenInternalData;

export { StoreTokenData, StoreTokenExternalData };
