import type { Request } from 'express';
import type { Profile } from 'passport';
// @ts-ignore
import { Strategy as StravaStrategy } from 'passport-strava-oauth2';

import { asyncSafeInvoke } from '../../../../moovin-groovin-shared/src/utils/safeInvoke';
import unixTimestamp from '../../utils/unixTimestamp';
import ServerModule, {
  assertContext,
  OAuthCreator,
  Services,
} from '../../lib/ServerModule';
import type { AuthToken } from '../storeToken/types';
import type { OAuthDeps } from '../oauth/types';
import { formatScopes, getScopesInfo } from './utils/scope';
import { PermissionScope, TokenDataResponse } from './types';
import type { OAuthHandlers } from '../oauth/handlers';
import type { OAuthSpotifyData } from '../oauthSpotify/data';
import type { OAuthModule } from '../oauth';

type ThisModule = ServerModule<
  Services,
  OAuthHandlers,
  OAuthSpotifyData,
  OAuthDeps & { oauth: OAuthModule }
>;

// NOTE: Type annotation by @types/passport doesn't match the actual type
// so we define this one instead.
type VerifyFunction = (
  this: ThisModule,
  req: Request<any, any, any, Partial<Record<'scope', string>>>,
  accessToken: string,
  refreshToken: string,
  response: TokenDataResponse,
  profile: Profile,
  done: (err: any, res: any) => void
) => void;

const assertScope = (scope?: string): void => {
  if (!scope) throw Error('"scope" query param missing');

  const { canReadPrivateActivities, canReadPublicActivities } = getScopesInfo(
    scope
  );

  if (!canReadPublicActivities && !canReadPrivateActivities) {
    throw Error(`Required permissions have not been granted`);
  }
};

const passportVerifier: VerifyFunction = async function verifier(
  req,
  accessToken,
  refreshToken,
  response,
  profile,
  done
) {
  const { error } = await asyncSafeInvoke(async () => {
    assertScope(req.query.scope);
    assertContext(this.context);

    const token: AuthToken = {
      accessToken,
      refreshToken,
      providerId: profile.provider,
      providerUserId: profile.id,
      expiresAt:
        response.expires_at ||
        Math.round(unixTimestamp() + (response.expires_in || 0)),
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

  return done(error, req.user ?? null);
};

const createOAuth = (): OAuthCreator => {
  const oauth: OAuthCreator = function oauth(
    this: ThisModule,
    { callbackUrl }
  ) {
    const verifier = passportVerifier.bind(this);
    const strategy = new StravaStrategy(
      {
        clientID: this.data.clientId,
        clientSecret: this.data.clientSecret,
        callbackURL: callbackUrl,
        passReqToCallback: true,
        scope: formatScopes([
          PermissionScope.ACTIVITY_READ_PUBLIC,
          PermissionScope.ACTIVITY_READ_PRIVATE,
          PermissionScope.ACTIVITY_WRITE,
        ]),
      },
      verifier
    );

    return strategy;
  };
  return oauth;
};

export default createOAuth;
