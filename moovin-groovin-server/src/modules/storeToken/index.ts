import ServerModule, { Handlers, ServerModules } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createCloser from './close';
import createInstaller from './install';
import createServices, { StoreTokenServices } from './services';
import type { TokenStoreData, TokenStoreExternalData } from './data';
import type { StoreTokenEmits } from './types';

type StoreTokenModuleOptions = Partial<TokenStoreExternalData>;

type StoreTokenModule = ServerModule<
  StoreTokenServices,
  Handlers,
  TokenStoreData,
  ServerModules,
  StoreTokenEmits
>;

const createStoreTokenModule = (
  options: StoreTokenModuleOptions
): StoreTokenModule => {
  const { clientConfig = {} } = options;

  return new ServerModule({
    name: ServerModuleName.STORE_TOKEN,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: {
      ...options,
      clientConfig,
      tokenStore: null,
    },
  });
};

export {
  createStoreTokenModule as default,
  StoreTokenModule,
  StoreTokenModuleOptions,
};
