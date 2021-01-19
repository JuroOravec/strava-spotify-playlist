import ServerModule, { Services, Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import type { SessionData } from './data';
import createInstaller from './install';

type SessionModuleOptions = Partial<SessionData>;
type SessionModule = ServerModule<Services, Handlers, SessionData>;

const createSessionModule = (
  options: SessionModuleOptions = {}
): SessionModule => {
  const { clientConfig = {}, initializePassport = true } = options;
  return new ServerModule({
    name: ServerModuleName.SESSION,
    install: createInstaller(),
    data: {
      ...options,
      initializePassport,
      clientConfig,
    },
  });
};

export { createSessionModule as default, SessionModule, SessionModuleOptions };
