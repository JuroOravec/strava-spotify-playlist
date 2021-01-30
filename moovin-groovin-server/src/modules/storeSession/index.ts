import ServerModule, {
  Handlers,
  ServerModules,
  Services,
} from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createCloser from './close';
import createInstaller from './install';
import type { StoreSessionData, StoreSessionExternalData } from './data';
import type { StoreSessionEmits } from './types';

type StoreSessionModuleOptions = Partial<StoreSessionExternalData>;

type StoreSessionModule = ServerModule<
  Services,
  Handlers,
  StoreSessionData,
  ServerModules,
  StoreSessionEmits
>;

const createStoreSessionModule = (
  options: StoreSessionModuleOptions
): StoreSessionModule => {
  const { clientConfig = {} } = options;

  return new ServerModule({
    name: ServerModuleName.STORE_SESSION,
    install: createInstaller(),
    close: createCloser(),
    data: {
      ...options,
      clientConfig,
      sessionStore: null,
      expressSessionStore: null,
    },
  });
};

export default createStoreSessionModule;
export type { StoreSessionModule, StoreSessionModuleOptions };
