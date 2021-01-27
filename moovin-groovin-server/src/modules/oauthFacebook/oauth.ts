import type { Request } from 'express';
import {
  Strategy as FacebookStrategy,
  VerifyFunctionWithRequest,
} from 'passport-facebook';

import ServerModule, {
  assertContext,
  Handlers,
  OAuthCreator,
  Services,
} from '../../lib/ServerModule';
import { asyncSafeInvoke } from '../../utils/safeInvoke';
import type { OAuthModule } from '../oauth';
import type { OAuthDeps } from '../oauth/types';
import type { AuthToken } from '../storeToken/types';
import type { UserModel } from '../storeUser/types';
import type { OAuthFacebookData } from './data';

type ThisModule = ServerModule<
  Services,
  Handlers,
  OAuthFacebookData,
  OAuthDeps & { oauth: OAuthModule }
>;

const passportVerifier: VerifyFunctionWithRequest = async function verifier(
  this: ThisModule,
  req: Request<any, any, any, Partial<Record<'scope', string>>>,
  accessToken,
  refreshToken,
  profile,
  done
) {
  const { result, error } = await asyncSafeInvoke<UserModel>(async () => {
    assertContext(this.context);

    const token: AuthToken = {
      accessToken,
      refreshToken,
      providerId: profile.provider,
      providerUserId: profile.id,
      expiresAt: 0,
      scope: req.query.scope ?? null,
    };

    const { processLoginProviderToken } = this.context.modules.oauth.services;
    return processLoginProviderToken(token, {
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
        passReqToCallback: true,
      },
      verifier as any
    );

    return strategy;
  };
  return oauth;
};

export default createOAuth;
