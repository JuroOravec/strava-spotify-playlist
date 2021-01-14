import {
  Strategy as SpotifyStrategy,
  Profile,
  VerifyCallback,
} from 'passport-spotify';

import unixTimestamp from '../../utils/unixTimestamp';
import ServerModule, {
  Handlers,
  OAuthCreator,
  Services,
} from '../../lib/ServerModule';
import type { AuthToken } from '../storeToken/types';
import type { PassportUser } from '../oauth/types';
import type { OAuthSpotifyData } from './data';

// NOTE: Type annotation by @types/passport doesn't match the actual type
// so we define this one instead.
type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  profile: Profile,
  done: VerifyCallback
) => void;

const passportVerifier: VerifyFunction = async function verifier(
  accessToken,
  refreshToken,
  expiresIn,
  profile,
  done
) {
  const token: AuthToken = {
    accessToken,
    refreshToken,
    providerId: profile.provider,
    providerUserId: profile.id,
    expiresAt: Math.round(unixTimestamp() + (expiresIn || 0)),
  };

  const passportUser: PassportUser = {
    token,
    user: {
      internalUserId: null,
      nameDisplay: profile.displayName,
      email: profile.emails?.[0]?.value,
      photo: profile.photos?.[0],
      loginProvider: profile.provider,
    },
  };

  done(null, passportUser);
};

const createOAuth = (): OAuthCreator => {
  const oauth: OAuthCreator = function oauth(
    this: ServerModule<Services, Handlers, OAuthSpotifyData>,
    { callbackUrl }
  ) {
    const strategy = new SpotifyStrategy(
      {
        clientID: this.data.clientId,
        clientSecret: this.data.clientSecret,
        callbackURL: callbackUrl,
        scope: [
          'user-follow-read',
          'user-read-recently-played',
          'playlist-modify-public',
          'playlist-modify-private',
        ],
      },
      passportVerifier as any
    );

    return strategy;
  };
  return oauth;
};

export default createOAuth;
