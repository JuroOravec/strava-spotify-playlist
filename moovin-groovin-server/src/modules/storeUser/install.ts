import type {
  ServerModule,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { StoreUserData } from './data';
import PGUserStore from './lib/PGUserStore';

const createStoreUserInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<Services, Handlers, StoreUserData>
  ) {
    this.data.userStore = new PGUserStore(this.data.clientConfig);
    await this.data.userStore.install();
  };

  return install;
};

export default createStoreUserInstaller;
