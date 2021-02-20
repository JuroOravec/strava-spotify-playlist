import { inject } from '@vue/composition-api';
import type { AnalyticsInstance } from 'analytics';
import { asyncSafeInvoke } from '@moovin-groovin/shared';

import { AnalyticsKey } from '../index';

export interface UseAnalytics {
  analytics: AnalyticsInstance | null;
  trackEvent: (event: string, properties?: Record<string, unknown>) => Promise<void>;
}

const useAnalytics = (): UseAnalytics => {
  const analytics = inject<AnalyticsInstance | null>(AnalyticsKey) ?? null;

  const trackEvent = async (event: string, properties?: Record<string, unknown>): Promise<void> => {
    if (!analytics) return;
    await asyncSafeInvoke(() => analytics.track(event, properties));
  };

  return {
    analytics,
    trackEvent,
  };
};

export default useAnalytics;
