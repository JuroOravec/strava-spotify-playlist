import { PrismaClient } from '@prisma/client';

import type {
  ServerModule,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { PrismaData } from './data';

const createPrismaInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<Services, Handlers, PrismaData>
  ) {
    this.data.client = new PrismaClient(this.data.clientOptions);
  };

  return install;
};

export default createPrismaInstaller;
