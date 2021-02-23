import type { AnalyticsInstance } from 'analytics';
import VueRouter, { RawLocation } from 'vue-router';

import type { PageProperties } from '../types';

export type StopHandle = () => void;

const trackPageOnRouteChange = (analytics: AnalyticsInstance, router: VueRouter): StopHandle => {
  // Note: afterEach is triggered after new route has been confirmed
  const stopHandle = router.afterEach((to, from): void => {
    const properties: PageProperties = {
      to: router.resolve(to as RawLocation),
      from: router.resolve(from as RawLocation),
    };

    analytics.page(properties as any);
  });

  return stopHandle as StopHandle;
};

export default trackPageOnRouteChange;
