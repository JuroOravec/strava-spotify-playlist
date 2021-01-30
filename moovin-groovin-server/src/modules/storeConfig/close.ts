import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { StoreConfigData } from './data';

const createStoreConfigCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, StoreConfigData>
  ): Promise<void> {
    await this.data.configStore?.close();
    this.data.configStore = null;
  };

  return close;
};

export default createStoreConfigCloser;
