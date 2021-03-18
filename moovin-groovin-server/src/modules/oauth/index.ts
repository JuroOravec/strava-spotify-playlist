import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createRouter from './router';
import createOpenApiSpec from './openapi';
import createGraphql from './graphql';
import createServices, { OAuthServices } from './services';
import type { OAuthData, OAuthExternalData } from './data';

type OAuthModuleOptions = SetRequiredFields<
  OAuthExternalData,
  'callbackUrlRoot'
>;

type OAuthModule = ServerModule<OAuthServices, Handlers, OAuthData>;

const createOAuthModule = (options: OAuthModuleOptions): OAuthModule => {
  const {
    providers = [],
    initializePassport = true,
    tokenExpiryCutoff = 0,
  } = options;

  return new ServerModule({
    name: ServerModuleName.OAUTH,
    install: createInstaller(),
    close: createCloser(),
    router: createRouter(),
    services: createServices(),
    openapi: createOpenApiSpec(),
    graphql: createGraphql(),
    data: {
      ...options,
      providers,
      initializePassport,
      tokenExpiryCutoff,
      resolvedProviders: null,
      cache: null,
    },
  });
};

export default createOAuthModule;
export type { OAuthModule, OAuthModuleOptions };
