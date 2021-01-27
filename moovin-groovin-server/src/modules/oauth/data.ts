import type { OAuthInput, OAuthInputFn, OAuthOptions } from './types';

interface OAuthExternalData {
  callbackUrlRoot: string;
  providers: OAuthInput | OAuthInputFn<any>;
  initializePassport: boolean;
}

interface OAuthInternalData {
  resolvedProviders: OAuthOptions[] | null;
}

type OAuthData = OAuthExternalData & OAuthInternalData;

export { OAuthData, OAuthExternalData };
