import type { ServerModule, Installer } from '../../lib/ServerModule';
import type { StoreTrackData } from './data';
import PGTrackStore from './lib/PGTrackStore';

const createStoreTrackInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<any, any, StoreTrackData>
  ) {
    this.data.trackStore = new PGTrackStore(this.data.clientConfig);
    await this.data.trackStore.install();
  };

  return install;
};

export default createStoreTrackInstaller;
