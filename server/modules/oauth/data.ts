import type NodeCache from 'node-cache';

import type { OAuthInput, OAuthInputFn, OAuthOptions } from './types';

interface OAuthExternalData {
  callbackUrlRoot: string;
  providers: OAuthInput | OAuthInputFn<any>;
}

interface OAuthInternalData {
  resolvedProviders: OAuthOptions[] | null;
  cache: NodeCache | null;
}

type OAuthData = OAuthExternalData & OAuthInternalData;

export { OAuthData, OAuthExternalData };
