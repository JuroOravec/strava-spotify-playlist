import type { AnalyticsInstance } from 'analytics';

import type { AnalyticsOptions } from './types';

interface AnalyticsExternalData {
  analyticsOptions: AnalyticsOptions;
}

interface AnalyticsInternalData {
  analytics: AnalyticsInstance | null;
}

type AnalyticsData = AnalyticsExternalData & AnalyticsInternalData;

export type { AnalyticsData, AnalyticsExternalData };
