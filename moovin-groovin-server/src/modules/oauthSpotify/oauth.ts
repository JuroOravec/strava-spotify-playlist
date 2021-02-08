import type { Request } from 'express';
import {
  Strategy as SpotifyStrategy,
  Profile,
  VerifyCallback,
} from 'passport-spotify';

import { asyncSafeInvoke } from '../../../../moovin-groovin-shared/src/utils/safeInvoke';
import unixTimestamp from '../../utils/unixTimestamp';
import {
  ServerModule,
  OAuthCreator,
  Services,
  assertContext,
} from '../../lib/ServerModule';
import type { AuthToken } from '../storeToken/types';
import type { OAuthDeps } from '../oauth/types';
import type { OAuthSpotifyData } from './data';
import type { OAuthHandlers } from '../oauth/handlers';
import type { OAuthModule } from '../oauth';

type ThisModule = ServerModule<
  Services,
  OAuthHandlers,
  OAuthSpotifyData,
  OAuthDeps & { oauth: OAuthModule }
>;

// NOTE: Type annotation by @types/passport doesn't match the actual type
// so we define this one instead.
type VerifyFunctionWithRequest = (
  req: Request<any, any, any, Partial<Record<'scope', string>>>,
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  profile: Profile,
  done: VerifyCallback
) => void;

const passportVerifier: VerifyFunctionWithRequest = async function verifier(
  this: ThisModule,
  req,
  accessToken,
  refreshToken,
  expiresIn,
  profile,
  done
) {
  const { error } = await asyncSafeInvoke(async () => {
    assertContext(this.context);

    const token: AuthToken = {
      accessToken,
      refreshToken,
      providerId: profile.provider,
      providerUserId: profile.id,
      expiresAt: Math.round(unixTimestamp() + (expiresIn || 0)),
      scope: req.query.scope ?? null,
    };

    const {
      processIntegrationProviderToken,
    } = this.context.modules.oauth.services;
    return processIntegrationProviderToken(
      token,
      req.user?.internalUserId,
      req.isAuthenticated()
    );
  });

  return done(error, req.user ?? undefined);
};

const createOAuth = (): OAuthCreator => {
  const oauth: OAuthCreator = function oauth(
    this: ThisModule,
    { callbackUrl }
  ) {
    const verifier = passportVerifier.bind(this);
    const strategy = new SpotifyStrategy(
      {
        clientID: this.data.clientId,
        clientSecret: this.data.clientSecret,
        callbackURL: callbackUrl,
        passReqToCallback: true,
        scope: [
          'user-follow-read',
          'user-read-recently-played',
          'playlist-modify-public',
          'playlist-modify-private',
        ],
      },
      verifier as any
    );

    return strategy;
  };
  return oauth;
};

export default createOAuth;
