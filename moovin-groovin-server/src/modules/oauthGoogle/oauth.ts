import type { Request } from 'express';
import {
  OAuth2Strategy as GoogleStrategy,
  Profile,
  VerifyFunction,
} from 'passport-google-oauth';

import { asyncSafeInvoke } from '@moovin-groovin/shared';
import ServerModule, {
  assertContext,
  OAuthCreator,
  Services,
} from '../../lib/ServerModule';
import type { OAuthModule } from '../oauth';
import type { OAuthHandlers } from '../oauth/handlers';
import type { OAuthDeps } from '../oauth/types';
import type { AuthToken } from '../storeToken/types';
import type { UserModel } from '../storeUser/types';
import type { OAuthGoogleData } from './data';

type ThisModule = ServerModule<
  Services,
  OAuthHandlers,
  OAuthGoogleData,
  OAuthDeps & { oauth: OAuthModule }
>;

const passportVerifier = async function verifier(
  this: ThisModule,
  req: Request<any, any, any, Partial<Record<'scope', string>>>,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) {
  const { result, error } = await asyncSafeInvoke(
    async (): Promise<UserModel> => {
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
    }
  );

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
        passReqToCallback: true,
      },
      verifier as any
    );

    return strategy;
  };
  return oauth;
};

export default createOAuth;
