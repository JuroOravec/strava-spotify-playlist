import type { TokenStore } from '../types';

function assertTokenStore(tokenStore?: TokenStore | null): asserts tokenStore {
  if (!tokenStore) {
    throw Error(`Cannot access token store`);
  }
}

export default assertTokenStore;
