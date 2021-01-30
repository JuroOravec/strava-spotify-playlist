import path from 'path';

import ServerModule, { Services } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import type { SessionData } from './data';
import createInstaller from './install';
import createHandlers, { SessionHandlers } from './handlers';
import createRouter from './router';

type SessionModuleOptions = Partial<SessionData>;
type SessionModule = ServerModule<Services, SessionHandlers, SessionData>;

const createSessionModule = (
  options: SessionModuleOptions = {}
): SessionModule => {
  const { clientConfig = {}, initializePassport = true } = options;
  return new ServerModule({
    name: ServerModuleName.SESSION,
    install: createInstaller(),
    handlers: createHandlers(),
    router: createRouter(),
    data: {
      ...options,
      initializePassport,
      clientConfig,
    },
    openapi: path.join(__dirname, './api.yml'),
  });
};

export default createSessionModule;
export type { SessionModule, SessionModuleOptions };
