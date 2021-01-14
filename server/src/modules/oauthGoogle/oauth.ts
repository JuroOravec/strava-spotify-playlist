import {
  OAuth2Strategy as GoogleStrategy,
  Profile,
  VerifyFunction,
} from 'passport-google-oauth';

import ServerModule, {
  assertContext,
  OAuthCreator,
  Services,
} from '../../lib/ServerModule';
import { asyncSafeInvoke } from '../../utils/safeInvoke';
import type { OAuthHandlers } from '../oauth/handlers';
import type { OAuthDeps, PassportUser } from '../oauth/types';
import type { AuthToken } from '../storeToken/types';
import type { OAuthGoogleData } from './data';

type ThisModule = ServerModule<
  Services,
  OAuthHandlers,
  OAuthGoogleData,
  OAuthDeps
>;

const passportVerifier = async function verifier(
  this: ThisModule,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) {
  const { result, error } = await asyncSafeInvoke<PassportUser>(async () => {
    assertContext(this.context);
    const token: AuthToken = {
      accessToken,
      refreshToken,
      providerId: profile.provider,
      providerUserId: profile.id,
      expiresAt: 0,
    };

    const {
      processLoginProviderPassportToken,
    } = this.context.modules.oauth.services;
    return processLoginProviderPassportToken(token, {
      nameDisplay: profile.displayName,
      nameFamily: profile.name?.familyName,
      nameGiven: profile.name?.givenName,
      email: profile.emails?.[0]?.value,
      photo: profile.photos?.[0]?.value,
    });
  });

  return done(error, result);
};

const createOAuth = (): OAuthCreator => {
  const oauth: OAuthCreator = function oauth(
    this: ThisModule,
    { callbackUrl }
  ) {
    const verifier = passportVerifier.bind(this);

    const strategy = new GoogleStrategy(
      {
        clientID: this.data.clientId,
        clientSecret: this.data.clientSecret,
        callbackURL: callbackUrl,
      },
      verifier as any
    );

    return strategy;
  };
  return oauth;
};

export default createOAuth;
