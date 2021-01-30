import type { ServerModule, Installer } from '../../lib/ServerModule';
import type { StorePlaylistData } from './data';
import PGPlaylistStore from './lib/PGPlaylistStore';

const createStorePlaylistInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<any, any, StorePlaylistData>
  ) {
    this.data.playlistStore = new PGPlaylistStore(this.data.clientConfig);
    await this.data.playlistStore.install();
  };

  return install;
};

export default createStorePlaylistInstaller;
