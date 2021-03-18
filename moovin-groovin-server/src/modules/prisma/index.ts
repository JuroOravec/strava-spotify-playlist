import ServerModule, { Handlers, Services } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import type { PrismaData, PrismaExternalData } from './data';
import createInstaller from './install';

type PrismaModuleOptions = Partial<PrismaExternalData>;
type PrismaModule = ServerModule<Services, Handlers, PrismaData>;

const createPrismaModule = (
  options: PrismaModuleOptions = {}
): PrismaModule => {
  const { clientOptions = {} } = options;
  return new ServerModule({
    name: ServerModuleName.PRISMA,
    install: createInstaller(),
    data: {
      ...options,
      clientOptions,
      client: null,
    },
  });
};

export default createPrismaModule;
export type { PrismaModule, PrismaModuleOptions };
