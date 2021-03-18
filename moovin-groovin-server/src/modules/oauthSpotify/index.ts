import ServerModule from '../../lib/ServerModule';
import unixTimestamp from '../../utils/unixTimestamp';
import {
  PlaylistProvider,
  ServerModuleName,
  SetRequiredFields,
} from '../../types';
import createOAuthHandlers, { OAuthHandlers } from '../oauth/handlers';
import createOAuthAccessTokenServices, {
  OAuthAccessTokenServices,
} from '../oauth/services/accessToken';
import createOAuth from './oauth';
import type { OAuthSpotifyData, OAuthSpotifyExternalData } from './data';
import type { OAuthSpotifyDeps } from './types';
import { UserTokenModel } from '../storeToken/types';

type OAuthSpotifyModuleOptions = SetRequiredFields<
  OAuthSpotifyExternalData,
  'clientId' | 'clientSecret'
>;

type OAuthSpotifyModule = ServerModule<
  OAuthAccessTokenServices,
  OAuthHandlers,
  OAuthSpotifyData,
  OAuthSpotifyDeps
>;

const doRefreshAccessToken = async function doRefreshAccessToken(
  this: OAuthSpotifyModule,
  oldToken: UserTokenModel
) {
  const spotifyClient = this.context?.modules.apiSpotify.data.spotify;
  spotifyClient?.setRefreshToken(oldToken.refreshToken);
  const response = await spotifyClient?.refreshAccessToken();
  if (!response) throw Error('Unable to refresh Spotify access token');
  return {
    providerId: PlaylistProvider.SPOTIFY,
    accessToken: response?.body.access_token,
    refreshToken: oldToken.refreshToken,
    expiresAt: Math.round(unixTimestamp() + (response?.body.expires_in || 0)),
  };
};

const createOAuthSpotifyModule = (
  options: OAuthSpotifyModuleOptions
): OAuthSpotifyModule => {
  return new ServerModule({
    name: ServerModuleName.OAUTH_SPOTIFY,
    handlers: createOAuthHandlers(PlaylistProvider.SPOTIFY),
    services: createOAuthAccessTokenServices(PlaylistProvider.SPOTIFY, {
      doRefreshAccessToken,
    }),
    oauth: createOAuth(),
    data: {
      ...options,
    },
  });
};

export default createOAuthSpotifyModule;
export type { OAuthSpotifyModule, OAuthSpotifyModuleOptions };
