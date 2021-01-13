import type { PGStoreOptions } from '../../lib/PGStore';
import type { TokenStore } from './types';

interface TokenStoreExternalData {
  clientConfig: PGStoreOptions;
}
interface TokenStoreInternalData {
  tokenStore: TokenStore | null;
}

type TokenStoreData = TokenStoreExternalData & TokenStoreInternalData;

export { TokenStoreData, TokenStoreExternalData };
