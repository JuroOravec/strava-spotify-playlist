import ServerModule from '../../lib/ServerModule';
import { PlaylistProvider, ServerModuleName } from '../../types';
import createOAuthHandlers, { OAuthHandlers } from '../oauth/handlers';
import createOAuthAccessTokenServices, {
  OAuthAccessTokenServices,
} from '../oauth/services/accessToken';
import createOAuth from './oauth';
import type { OAuthAppleMusicData, OAuthAppleMusicExternalData } from './data';
import type { UserTokenModel } from '../storeToken/types';

type OAuthAppleMusicModuleOptions = OAuthAppleMusicExternalData;

type OAuthAppleMusicModule = ServerModule<
  OAuthAccessTokenServices,
  OAuthHandlers,
  OAuthAppleMusicData
>;

const doRefreshAccessToken = async function doRefreshAccessToken(
  this: OAuthAppleMusicModule,
  oldToken: UserTokenModel
) {
  return oldToken;
};

const createOAuthAppleMusicModule = (
  options: OAuthAppleMusicModuleOptions
): OAuthAppleMusicModule => {
  return new ServerModule({
    name: ServerModuleName.OAUTH_APPLE_MUSIC,
    handlers: createOAuthHandlers(PlaylistProvider.APPLE_MUSIC),
    services: createOAuthAccessTokenServices(PlaylistProvider.APPLE_MUSIC, {
      doRefreshAccessToken,
    }),
    oauth: createOAuth(),
    data: {
      ...options,
    },
  });
};

export default createOAuthAppleMusicModule;
export type { OAuthAppleMusicModule, OAuthAppleMusicModuleOptions };
