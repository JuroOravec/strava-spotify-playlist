import ServerModule, { Services } from '../../lib/ServerModule';
import { AuthProvider, ServerModuleName, SetRequiredFields } from '../../types';
import createOAuthHandlers, { OAuthHandlers } from '../oauth/handlers';
import createOAuth from './oauth';
import type { OAuthFacebookData, OAuthFacebookExternalData } from './data';

type OAuthFacebookModuleOptions = SetRequiredFields<
  OAuthFacebookExternalData,
  'clientId' | 'clientSecret'
>;

type OAuthFacebookModule = ServerModule<
  Services,
  OAuthHandlers,
  OAuthFacebookData
>;

const createOAuthFacebookModule = (
  options: OAuthFacebookModuleOptions
): OAuthFacebookModule => {
  return new ServerModule({
    name: ServerModuleName.OAUTH_FACEBOOK,
    handlers: createOAuthHandlers(AuthProvider.FACEBOOK, {
      scope: ['email'],
    }),
    oauth: createOAuth(),
    data: {
      ...options,
    },
  });
};

export default createOAuthFacebookModule;
export type { OAuthFacebookModule, OAuthFacebookModuleOptions };
