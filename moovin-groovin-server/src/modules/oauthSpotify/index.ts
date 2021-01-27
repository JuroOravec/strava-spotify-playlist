import ServerModule from '../../lib/ServerModule';
import unixTimestamp from '../../utils/unixTimestamp';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createOAuthHandlers, { OAuthHandlers } from '../oauth/handlers';
import createOAuthAccessTokenServices, {
  OAuthAccessTokenServices,
} from '../oauth/services/accessToken';
import createOAuth from './oauth';
import type { OAuthSpotifyData, OAuthSpotifyExternalData } from './data';
import type { OAuthStravaDeps } from './types';

type OAuthSpotifyModuleOptions = SetRequiredFields<
  OAuthSpotifyExternalData,
  'clientId' | 'clientSecret'
>;

type OAuthSpotifyModule = ServerModule<
  OAuthAccessTokenServices,
  OAuthHandlers,
  OAuthSpotifyData,
  OAuthStravaDeps
>;

const doRefreshAccessToken = async function doRefreshAccessToken(
  this: OAuthSpotifyModule,
  refreshToken: string
) {
  const spotifyClient = this.context?.modules.spotify.data.spotify;
  spotifyClient?.setRefreshToken(refreshToken);
  const response = await spotifyClient?.refreshAccessToken();
  if (!response) throw Error('Unable to refresh Spotify access token');
  return {
    providerId: 'spotify',
    accessToken: response?.body.access_token,
    refreshToken: refreshToken,
    expiresAt: Math.round(unixTimestamp() + (response?.body.expires_in || 0)),
  };
};

const createOAuthSpotifyModule = (
  options: OAuthSpotifyModuleOptions
): OAuthSpotifyModule => {
  const { tokenExpiryCutoff = 0 } = options;

  return new ServerModule({
    name: ServerModuleName.OAUTH_SPOTIFY,
    handlers: createOAuthHandlers('spotify'),
    services: createOAuthAccessTokenServices('spotify', {
      doRefreshAccessToken,
    }),
    oauth: createOAuth(),
    data: {
      ...options,
      tokenExpiryCutoff,
    },
  });
};

export {
  createOAuthSpotifyModule as default,
  OAuthSpotifyModule,
  OAuthSpotifyModuleOptions,
};
