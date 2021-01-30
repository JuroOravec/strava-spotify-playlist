import strava from 'strava-v3';

import ServerModule from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createOAuthHandlers, { OAuthHandlers } from '../oauth/handlers';
import createOAuthServices, {
  OAuthAccessTokenServices,
} from '../oauth/services/accessToken';
import createOAuth from './oauth';
import type { OAuthStravaData, OAuthStravaExternalData } from './data';

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
  refreshToken: string
) {
  const refreshedToken = await strava.oauth.refreshToken(refreshToken);
  return {
    providerId: 'strava',
    accessToken: refreshedToken.access_token,
    refreshToken: refreshedToken.refresh_token,
    expiresAt: refreshedToken.expires_at,
  };
};

const createOAuthStravaModule = (
  options: OAuthStravaModuleOptions
): OAuthStravaModule => {
  const { tokenExpiryCutoff = 0 } = options;

  return new ServerModule({
    name: ServerModuleName.OAUTH_STRAVA,
    handlers: createOAuthHandlers('strava'),
    services: createOAuthServices('strava', { doRefreshAccessToken }),
    oauth: createOAuth(),
    data: {
      ...options,
      tokenExpiryCutoff,
    },
  });
};

export default createOAuthStravaModule;
export type { OAuthStravaModule, OAuthStravaModuleOptions };
