import type {
  ServerModule,
  Closer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import type { HostData } from './data';

const createHostCloser = (): Closer => {
  const close: Closer = function close(
    this: ServerModule<Services, Handlers, HostData>
  ) {
    if (this.data.localtunnel) {
      logger.info('Closing localtunnel');
      this.data.localtunnel?.close();
      logger.info('Done closing localtunnel');
    }
  };

  return close;
};

export default createHostCloser;
