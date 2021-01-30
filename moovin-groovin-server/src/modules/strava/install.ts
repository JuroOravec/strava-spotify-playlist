import { Handlers, Services } from '../../lib/ServerModule';
import strava, { AuthenticationConfig } from 'strava-v3';

import type { ServerModule, Installer } from '../../lib/ServerModule';
import type { StravaData } from './data';

const createStravaInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, StravaData>
  ): void {
    strava.config(this.data as AuthenticationConfig);
  };

  return install;
};

export default createStravaInstaller;
