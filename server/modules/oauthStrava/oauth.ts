import type { Profile } from 'passport';
// @ts-ignore
import { Strategy as StravaStrategy } from 'passport-strava-oauth2';

import unixTimestamp from '../../utils/unixTimestamp';
import ServerModule, {
  Handlers,
  OAuthCreator,
  Services,
} from '../../lib/ServerModule';
import type { AuthToken } from '../storeToken/types';
import type { PassportUser } from '../oauth/types';
import type { OAuthStravaData } from './data';
import { formatScopes } from './utils/scope';
import { PermissionScope, TokenDataResponse } from './types';

// NOTE: Type annotation by @types/passport doesn't match the actual type
// so we define this one instead.
type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  response: TokenDataResponse,
  profile: Profile,
  done: (err: any, res: any) => void
) => void;

const passportVerifier: VerifyFunction = async function verifier(
  accessToken,
  refreshToken,
  response,
  profile,
  done
) {
  const token: AuthToken = {
    accessToken,
    refreshToken,
    providerId: profile.provider,
    providerUserId: profile.id,
    expiresAt:
      response.expires_at ||
      Math.round(unixTimestamp() + (response.expires_in || 0)),
  };

  const passportUser: PassportUser = {
    token,
    user: {
      internalUserId: null,
      nameDisplay: profile.displayName,
      email: profile.emails?.[0]?.value,
      photo: profile.photos?.[0]?.value,
      loginProvider: profile.provider,
    },
  };

  done(null, passportUser);
};

const createOAuth = (): OAuthCreator => {
  const oauth: OAuthCreator = function oauth(
    this: ServerModule<Services, Handlers, OAuthStravaData>,
    { callbackUrl }
  ) {
    const strategy = new StravaStrategy(
      {
        clientID: this.data.clientId,
        clientSecret: this.data.clientSecret,
        callbackURL: callbackUrl,
        scope: formatScopes([
          PermissionScope.ACTIVITY_READ_PUBLIC,
          PermissionScope.ACTIVITY_READ_PRIVATE,
          PermissionScope.ACTIVITY_WRITE,
        ]),
      },
      passportVerifier
    );

    return strategy;
  };
  return oauth;
};

export default createOAuth;
