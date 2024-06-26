import isNil from 'lodash/isNil';

import type {
  ServerModule,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import createLocaltunnel from './lib/localtunnel';
import logger from '../../lib/logger';
import type { HostData } from './data';

const createHostInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<Services, Handlers, HostData>
  ) {
    if (this.data.localtunnelEnabled) {
      if (isNil(this.data.port)) {
        throw Error('Host option "port" is required to enable localtunnel');
      }
      logger.info('Using localtunnel for host URL');
      this.data.localtunnel = await createLocaltunnel({
        ...this.data.localtunnelOptions,
        port: this.data.port,
      });
    }
  };

  return install;
};

export default createHostInstaller;
