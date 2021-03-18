import strava from 'strava-v3';

import ServerModule from '../../lib/ServerModule';
import {
  ActivityProvider,
  ServerModuleName,
  SetRequiredFields,
} from '../../types';
import createOAuthHandlers, { OAuthHandlers } from '../oauth/handlers';
import createOAuthServices, {
  OAuthAccessTokenServices,
} from '../oauth/services/accessToken';
import createOAuth from './oauth';
import type { OAuthStravaData, OAuthStravaExternalData } from './data';
import { UserTokenModel } from '../storeToken/types';

type OAuthStravaModuleOptions = SetRequiredFields<
  OAuthStravaExternalData,
  'clientId' | 'clientSecret'
>;

type OAuthStravaModule = ServerModule<
  OAuthAccessTokenServices,
  OAuthHandlers,
  OAuthStravaData
>;

const doRefreshAccessToken = async function doRefreshAccessToken(
  this: OAuthStravaModule,
  oldToken: UserTokenModel
) {
  const refreshedToken = await strava.oauth.refreshToken(oldToken.refreshToken);
  return {
    providerId: ActivityProvider.STRAVA,
    accessToken: refreshedToken.access_token,
    refreshToken: refreshedToken.refresh_token,
    expiresAt: refreshedToken.expires_at,
  };
};

const createOAuthStravaModule = (
  options: OAuthStravaModuleOptions
): OAuthStravaModule => {
  return new ServerModule({
    name: ServerModuleName.OAUTH_STRAVA,
    handlers: createOAuthHandlers(ActivityProvider.STRAVA),
    services: createOAuthServices(ActivityProvider.STRAVA, {
      doRefreshAccessToken,
    }),
    oauth: createOAuth(),
    data: {
      ...options,
    },
  });
};

export default createOAuthStravaModule;
export type { OAuthStravaModule, OAuthStravaModuleOptions };
