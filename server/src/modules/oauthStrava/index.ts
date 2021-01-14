import strava from 'strava-v3';

import ServerModule from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createOAuthHandlers, { OAuthHandlers } from '../oauth/handlers';
import createOAuthServices, {
  OAuthAccessTokenServices,
} from '../oauth/services/accessToken';
import createOAuth from './oauth';
import type { OAuthStravaData, OAuthStravaExternalData } from './data';
import { getScopesInfo } from './utils/scope';

type OAuthStravaModuleOptions = SetRequiredFields<
  OAuthStravaExternalData,
  'clientId' | 'clientSecret'
>;

type OAuthStravaModule = ServerModule<
  OAuthAccessTokenServices,
  OAuthHandlers,
  OAuthStravaData
>;

const assertScope = (scope?: string): void => {
  if (!scope) throw Error('"scope" query param missing');

  const { canReadPrivateActivities, canReadPublicActivities } = getScopesInfo(
    scope
  );

  if (!canReadPublicActivities && !canReadPrivateActivities) {
    throw Error(`Required permissions have not been granted`);
  }
};

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
    handlers: createOAuthHandlers('strava', {
      requireUserId: true,
      assertScope,
    }),
    services: createOAuthServices('strava', { doRefreshAccessToken }),
    oauth: createOAuth(),
    data: {
      ...options,
      tokenExpiryCutoff,
    },
  });
};

export {
  createOAuthStravaModule as default,
  OAuthStravaModule,
  OAuthStravaModuleOptions,
};
