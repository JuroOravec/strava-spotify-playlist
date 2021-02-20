import type { AnalyticsInstance } from 'analytics';
import type VueRouter from 'vue-router';

export type StopHandle = () => void;

const trackPageOnRouteChange = (analytics: AnalyticsInstance, router: VueRouter): StopHandle => {
  // Note: afterEach is triggered after new route has been confirmed
  const stopHandle = router.afterEach((to, from): void => {
    analytics.page({
      // @ts-ignore - Typing does not recognize it, but you can pass anything as data
      to: router.resolve(to),
      // @ts-ignore
      from: router.resolve(from),
    });
  });

  return stopHandle as StopHandle;
};

export default trackPageOnRouteChange;
