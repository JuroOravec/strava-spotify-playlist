import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { TokenStoreData } from './data';

const createTokenStoreCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, TokenStoreData>
  ): Promise<void> {
    await this.data.tokenStore?.close();
    this.data.tokenStore = null;
  };

  return close;
};

export { createTokenStoreCloser as default };
