import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { StoreSessionData } from './data';

const createStoreSessionCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, StoreSessionData>
  ): Promise<void> {
    await this.data.sessionStore?.close();
    this.data.sessionStore = null;
  };

  return close;
};

export { createStoreSessionCloser as default };
