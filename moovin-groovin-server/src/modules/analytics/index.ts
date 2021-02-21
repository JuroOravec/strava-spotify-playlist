import ServerModule, { Services, Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import type { AnalyticsData, AnalyticsExternalData } from './data';
import createInstaller from './install';

type AnalyticsModuleOptions = Partial<AnalyticsExternalData>;
type AnalyticsModule = ServerModule<Services, Handlers, AnalyticsData>;

const createAnalyticsModule = (
  options: AnalyticsModuleOptions = {}
): AnalyticsModule => {
  const { analyticsOptions = {} } = options;

  return new ServerModule({
    name: ServerModuleName.ANALYTICS,
    install: createInstaller(),
    data: {
      ...options,
      analyticsOptions,
      analytics: null,
    },
  });
};

export default createAnalyticsModule;
export type { AnalyticsModule, AnalyticsModuleOptions };
