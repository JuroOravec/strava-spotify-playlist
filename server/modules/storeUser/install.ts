import type { ServerModule, Installer } from '../../lib/ServerModule';
import type { StoreUserData } from './data';
import PGUserStore from './lib/PGUserStore';

const createStoreUserInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<any, any, StoreUserData>
  ) {
    this.data.userStore = new PGUserStore(this.data.clientConfig);
    await this.data.userStore.install();
  };

  return install;
};

export { createStoreUserInstaller as default };
