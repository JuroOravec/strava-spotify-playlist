import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import type { AnalyticsData, AnalyticsExternalData } from './data';
import createInstaller from './install';
import createServices, { AnalyticsServices } from './services';

type AnalyticsModuleOptions = Partial<AnalyticsExternalData>;
type AnalyticsModule = ServerModule<AnalyticsServices, Handlers, AnalyticsData>;

const createAnalyticsModule = (
  options: AnalyticsModuleOptions = {}
): AnalyticsModule => {
  const { analyticsOptions = {} } = options;

  return new ServerModule({
    name: ServerModuleName.ANALYTICS,
    install: createInstaller(),
    services: createServices(),
    data: {
      ...options,
      analyticsOptions,
      analytics: null,
    },
  });
};

export default createAnalyticsModule;
export type { AnalyticsModule, AnalyticsModuleOptions };
