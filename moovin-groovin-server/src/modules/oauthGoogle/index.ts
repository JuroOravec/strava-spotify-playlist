import ServerModule, { Services } from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createCredentialsHandlers, { OAuthHandlers } from '../oauth/handlers';
import createOAuth from './oauth';
import type { OAuthGoogleData, OAuthGoogleExternalData } from './data';

type OAuthGoogleModuleOptions = SetRequiredFields<
  OAuthGoogleExternalData,
  'clientId' | 'clientSecret'
>;

type OAuthGoogleModule = ServerModule<Services, OAuthHandlers, OAuthGoogleData>;

const createOAuthGoogleModule = (
  options: OAuthGoogleModuleOptions
): OAuthGoogleModule => {
  return new ServerModule({
    name: ServerModuleName.OAUTH_GOOGLE,
    handlers: createCredentialsHandlers('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    }),
    oauth: createOAuth(),
    data: {
      ...options,
    },
  });
};

export default createOAuthGoogleModule;
export type { OAuthGoogleModule, OAuthGoogleModuleOptions };
