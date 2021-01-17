import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createCloser from './close';
import createInstaller from './install';
import createServices, { StoreTrackServices } from './services';
import type { StoreTrackData, StoreTrackExternalData } from './data';

type StoreTrackModuleOptions = Partial<StoreTrackExternalData>;

type StoreTrackModule = ServerModule<
  StoreTrackServices,
  Handlers,
  StoreTrackData
>;

const createStoreTrackModule = (
  options: StoreTrackModuleOptions
): StoreTrackModule => {
  const { clientConfig = {} } = options;

  return new ServerModule({
    name: ServerModuleName.STORE_TRACK,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: {
      ...options,
      clientConfig,
      trackStore: null,
    },
  });
};

export {
  createStoreTrackModule as default,
  StoreTrackModule,
  StoreTrackModuleOptions,
};
