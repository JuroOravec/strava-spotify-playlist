import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { StoreUserData } from './data';

const createStoreUserCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, StoreUserData>
  ): Promise<void> {
    await this.data.userStore?.close();
    this.data.userStore = null;
  };

  return close;
};

export default createStoreUserCloser;
