import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { StoreTokenData } from './data';

const createTokenStoreCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, StoreTokenData>
  ): Promise<void> {
    await this.data.tokenStore?.close();
    this.data.tokenStore = null;
  };

  return close;
};

export { createTokenStoreCloser as default };
