import { Handlers, Services } from '../../lib/ServerModule';
import strava, { AuthenticationConfig } from 'strava-v3';

import type { ServerModule, Installer } from '../../lib/ServerModule';
import type { ApiStravaData } from './data';

const createApiStravaInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, ApiStravaData>
  ): void {
    strava.config(this.data as AuthenticationConfig);
  };

  return install;
};

export default createApiStravaInstaller;
