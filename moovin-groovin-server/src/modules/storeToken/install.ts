import type { ServerModule, Installer } from '../../lib/ServerModule';
import type { TokenStoreData } from './data';
import PGTokenStore from './lib/PGTokenStore';

const createTokenStoreInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<any, any, TokenStoreData>
  ) {
    this.data.tokenStore = new PGTokenStore(this.data.clientConfig);
    await this.data.tokenStore.install();
  };

  return install;
};

export { createTokenStoreInstaller as default };