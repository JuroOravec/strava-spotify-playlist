import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { StoreTrackData } from './data';

const createStoreTrackCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, StoreTrackData>
  ): Promise<void> {
    await this.data.trackStore?.close();
    this.data.trackStore = null;
  };

  return close;
};

export { createStoreTrackCloser as default };
