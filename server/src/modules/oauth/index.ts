import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createRouter from './router';
import createOpenApiSpec from './openapi';
import createServices, { OAuthServices } from './services';
import type { OAuthData, OAuthExternalData } from './data';

type OAuthModuleOptions = SetRequiredFields<
  OAuthExternalData,
  'callbackUrlRoot'
>;

type OAuthModule = ServerModule<OAuthServices, Handlers, OAuthData>;

const createOAuthModule = (options: OAuthModuleOptions): OAuthModule => {
  const { providers = [] } = options;

  return new ServerModule({
    name: ServerModuleName.OAUTH,
    install: createInstaller(),
    close: createCloser(),
    router: createRouter(),
    services: createServices(),
    openapi: createOpenApiSpec(),
    data: {
      ...options,
      providers,
      resolvedProviders: null,
      cache: null,
    },
  });
};

export { createOAuthModule as default, OAuthModule, OAuthModuleOptions };
