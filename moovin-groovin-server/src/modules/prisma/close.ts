import type {
  ServerModule,
  Closer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import type { PrismaData } from './data';

const createPrismaCloser = (): Closer => {
  const close: Closer = function close(
    this: ServerModule<Services, Handlers, PrismaData>
  ) {
    if (this.data.client) {
      logger.info('Disconnecting Prisma client');
      this.data.client?.$disconnect();
      logger.info('Done disconnecting Prisma client');
    }
  };

  return close;
};

export default createPrismaCloser;
