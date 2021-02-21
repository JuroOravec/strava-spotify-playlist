import { Analytics } from 'analytics';

import type {
  ServerModule,
  ModuleContext,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { AnalyticsData } from './data';

const createAnalyticsInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, AnalyticsData>,
    { app }: ModuleContext
  ) {
    this.data.analytics = Analytics(this.data.analyticsOptions ?? {});
  };

  return install;
};

export default createAnalyticsInstaller;
