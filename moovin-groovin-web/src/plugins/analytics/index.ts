import type { VueConstructor, ComponentOptions } from 'vue';
import type VueRouter from 'vue-router';
import { Analytics } from 'analytics';
import { getCurrentInstance, onBeforeUnmount, provide } from '@vue/composition-api';

import applyMixinOnce from '@/modules/utils/utils/applyMixinOnce';
import trackPageOnRouteChange, { StopHandle } from './track/trackPageOnRouteChange';
import useAnalytics from './composables/useAnalytics';
import type { AnalyticsConfig, AnalyticsInstance } from './types';

export const AnalyticsKey = Symbol('AnalyticsKey');

/** Set of Vue classes that have the plugin installed */
const installedVues = new Set<VueConstructor>();

/** Remember which routers have analytics integrated */
const integratedRouters = new Map<VueRouter, StopHandle>();

/**
 * Try to assign analytics instance to Vue instance. Inspired by Vuetify's
 * resolution logic. This allows to use multiple Analytics instances, which
 * then propagates to all child components.
 *
 * Resolution order:
 * 1. Get instance from component's options
 * 3. Get instance from component's parent
 * 4. Get instance from component's root
 */
const resolveInstance = (vueInstance: Vue | null): AnalyticsInstance | null => {
  if (!vueInstance) return null;
  const options = vueInstance.$options;

  const analytics: AnalyticsInstance | null =
    options.analytics || vueInstance.$parent?.$analytics || vueInstance.$root?.$analytics || null;

  return analytics;
};

const createAnalyticsMixin = (): ComponentOptions<Vue> => ({
  name: 'AnalyticsMixin',
  setup() {
    const instance = getCurrentInstance();

    const currAnalytics = resolveInstance(instance?.proxy ?? null);
    provide(AnalyticsKey, currAnalytics);

    return {
      /* eslint-disable-next-line vue/no-unused-properties */
      $analytics: currAnalytics,
    };
  },
});

const createAnalyticsTrackRouteMixin = (): ComponentOptions<Vue> => {
  return {
    name: 'AnalyticsTrackRouteMixin',
    setup() {
      const instance = getCurrentInstance();
      const { analytics } = useAnalytics();
      const router = instance?.proxy.$router;

      if (!analytics || !router || integratedRouters.has(router)) return;

      // Integrate with router
      const stopHandle = trackPageOnRouteChange(analytics, router);
      integratedRouters.set(router, stopHandle);
      onBeforeUnmount(stopHandle);
    },
  };
};

const installAnalytics = (
  vueClass: VueConstructor,
  options: AnalyticsConfig & { trackRouter?: boolean } = {}
): AnalyticsInstance => {
  const { trackRouter, ...analyticsOptions } = options;

  const analytics = Analytics(analyticsOptions);

  // Guard to prevent the plugin installing multiple times on the same Vue constructor
  // Used to avoid multiple mixins being setup
  // when in dev mode and hot module reload
  // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
  if (installedVues.has(vueClass)) return analytics;
  installedVues.add(vueClass);

  applyMixinOnce(vueClass, createAnalyticsMixin());

  if (trackRouter) {
    vueClass.mixin(createAnalyticsTrackRouteMixin());
  }

  return analytics;
};

export default installAnalytics;
