import type {
  ServerModule,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { StorePlaylistData } from './data';
import PGPlaylistStore from './lib/PGPlaylistStore';

const createStorePlaylistInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<Services, Handlers, StorePlaylistData>
  ) {
    this.data.playlistStore = new PGPlaylistStore(this.data.clientConfig);
    await this.data.playlistStore.install();
  };

  return install;
};

export default createStorePlaylistInstaller;
