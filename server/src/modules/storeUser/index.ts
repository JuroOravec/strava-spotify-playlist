import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createCloser from './close';
import createInstaller from './install';
import createServices, { StoreUserServices } from './services';
import type { StoreUserData, StoreUserExternalData } from './data';

type StoreUserModuleOptions = Partial<StoreUserExternalData>;

type StoreUserModule = ServerModule<StoreUserServices, Handlers, StoreUserData>;

const createStoreUserModule = (
  options: StoreUserModuleOptions
): StoreUserModule => {
  const { clientConfig = {} } = options;

  return new ServerModule({
    name: ServerModuleName.STORE_USER,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: {
      ...options,
      clientConfig,
      userStore: null,
    },
  });
};

export {
  createStoreUserModule as default,
  StoreUserModule,
  StoreUserModuleOptions,
};
