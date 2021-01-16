import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import type { HostData, HostExternalData } from './data';
import createInstaller from './install';
import createServices, { HostServices } from './services';

type HostModuleOptions = Partial<HostExternalData>;
type HostModule = ServerModule<HostServices, Handlers, HostData>;

const createHostModule = (options: HostModuleOptions = {}): HostModule => {
  const { port, localtunnelEnabled = false, localtunnelOptions = {} } = options;
  return new ServerModule({
    name: ServerModuleName.HOST,
    install: createInstaller(),
    services: createServices(),
    data: {
      ...options,
      localtunnelEnabled,
      localtunnelOptions,
      localtunnel: null,
      port,
    },
  });
};

export { createHostModule as default, HostModule, HostModuleOptions };
