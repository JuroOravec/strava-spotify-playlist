import type {
  ServerModule,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { StoreConfigData } from './data';
import PGConfigStore from './lib/PGConfigStore';

const createStoreConfigInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<Services, Handlers, StoreConfigData>
  ) {
    this.data.configStore = new PGConfigStore(this.data.clientConfig);
    await this.data.configStore.install();
  };

  return install;
};

export default createStoreConfigInstaller;
