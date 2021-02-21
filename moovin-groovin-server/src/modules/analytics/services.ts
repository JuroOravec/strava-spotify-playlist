import type { AnalyticsInstance } from 'analytics';

import type { ServerModule, Handlers, Services } from '../../lib/ServerModule';
import type { AnalyticsData } from './data';

interface AnalyticsServices extends Services {
  getAnalytics: () => AnalyticsInstance | null;
}

type ThisModule = ServerModule<AnalyticsServices, Handlers, AnalyticsData>;

const createAnalyticsServices = (): AnalyticsServices => {
  function getAnalytics(this: ThisModule): AnalyticsInstance | null {
    return this.data.analytics;
  }

  return {
    getAnalytics,
  };
};

export default createAnalyticsServices;
export type { AnalyticsServices };
