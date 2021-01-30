import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { StorePlaylistData } from './data';

const createStorePlaylistCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, StorePlaylistData>
  ): Promise<void> {
    await this.data.playlistStore?.close();
    this.data.playlistStore = null;
  };

  return close;
};

export default createStorePlaylistCloser;
