import {
  Strategy as FacebookStrategy,
  VerifyFunction,
} from 'passport-facebook';

import ServerModule, {
  assertContext,
  Handlers,
  OAuthCreator,
  Services,
} from '../../lib/ServerModule';
import { asyncSafeInvoke } from '../../utils/safeInvoke';
import type { OAuthModule } from '../oauth';
import type { OAuthDeps, PassportUser } from '../oauth/types';
import type { AuthToken } from '../storeToken/types';
import type { OAuthFacebookData } from './data';

type ThisModule = ServerModule<
  Services,
  Handlers,
  OAuthFacebookData,
  OAuthDeps & { oauth: OAuthModule }
>;

const passportVerifier: VerifyFunction = async function verifier(
  this: ThisModule,
  accessToken,
  refreshToken,
  profile,
  done
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
    this: ServerModule<Services, Handlers, OAuthFacebookData>,
    { callbackUrl }
  ) {
    const verifier = passportVerifier.bind(this);

    const strategy = new FacebookStrategy(
      {
        clientID: this.data.clientId,
        clientSecret: this.data.clientSecret,
        callbackURL: callbackUrl,
        profileFields: ['id', 'emails', 'name', 'displayName'],
      },
      verifier as any
    );

    return strategy;
  };
  return oauth;
};

export default createOAuth;
