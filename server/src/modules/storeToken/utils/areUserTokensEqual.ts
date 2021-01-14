import type { UserTokenMeta } from '../types';

const areUserTokensEqual = (
  tokenA: UserTokenMeta,
  tokenB: UserTokenMeta
): boolean =>
  tokenA.providerId === tokenB.providerId &&
  tokenA.providerUserId === tokenB.providerUserId;

export default areUserTokensEqual;
