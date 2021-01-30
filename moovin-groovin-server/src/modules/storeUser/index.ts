import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createCloser from './close';
import createInstaller from './install';
import createServices, { StoreUserServices } from './services';
import createGraphql from './graphql';
import type { StoreUserData, StoreUserExternalData } from './data';
import type { StoreUserDeps } from './types';

type StoreUserModuleOptions = Partial<StoreUserExternalData>;

type StoreUserModule = ServerModule<
  StoreUserServices,
  Handlers,
  StoreUserData,
  StoreUserDeps
>;

const createStoreUserModule = (
  options: StoreUserModuleOptions
): StoreUserModule => {
  const { clientConfig = {} } = options;

  return new ServerModule({
    name: ServerModuleName.STORE_USER,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    graphql: createGraphql(),
    data: {
      ...options,
      clientConfig,
      userStore: null,
    },
  });
};

export default createStoreUserModule;
export type { StoreUserModule, StoreUserModuleOptions };
