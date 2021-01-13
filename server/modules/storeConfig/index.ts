import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createCloser from './close';
import createInstaller from './install';
import createServices, { StoreConfigServices } from './services';
import createStoreConfigData, {
  StoreConfigData,
  StoreConfigExternalData,
} from './data';

type StoreConfigModuleOptions = Partial<StoreConfigExternalData>;

type StoreConfigModule = ServerModule<
  StoreConfigServices,
  Handlers,
  StoreConfigData
>;

const createStoreConfigModule = (
  options: StoreConfigModuleOptions
): StoreConfigModule => {
  return new ServerModule({
    name: ServerModuleName.STORE_CONFIG,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: createStoreConfigData(options),
  });
};

export {
  createStoreConfigModule as default,
  StoreConfigModule,
  StoreConfigModuleOptions,
};
