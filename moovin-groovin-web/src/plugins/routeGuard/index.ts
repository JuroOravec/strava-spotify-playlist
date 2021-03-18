import type { VueConstructor } from 'vue';
import { provide } from '@vue/composition-api';
import type { NavigationGuard, NavigationGuardNext } from 'vue-router';
import isNil from 'lodash/isNil';

import applyMixinOnce from '@/modules/utils/utils/applyMixinOnce';

interface RouteGuards {
  beforeEnter: Record<string, NavigationGuard[]>;
  beforeLeave: Record<string, NavigationGuard[]>;
}

interface RouteGuardPlugin {
  routeGuards: RouteGuards;
}

const RouteGuardKey = Symbol('RouteGuardKey');

const installRouteGuard = (vueClass: VueConstructor): RouteGuardPlugin => {
  const routeGuards: RouteGuards = {
    beforeEnter: {},
    beforeLeave: {},
  };

  const onRouteGuard = (
    type: keyof RouteGuards,
    ...[to, from, next]: Parameters<NavigationGuard>
  ) => {
    const routeName = type === 'beforeEnter' ? to.name : from.name;
    if (isNil(routeName)) return next();

    let nextHasBeenCalled = false;
    const wrappedNext = (...args: Parameters<NavigationGuardNext>) => {
      nextHasBeenCalled = true;
      return next(...args);
    };

    routeGuards[type]?.[routeName]?.forEach((routeGuard) =>
      routeGuard({ ...to }, { ...from }, wrappedNext)
    );

    if (!nextHasBeenCalled) next();
  };

  applyMixinOnce(vueClass, {
    setup() {
      provide(RouteGuardKey, routeGuards);
    },
  });

  vueClass.mixin({
    name: 'RouteGuardMixin',
    beforeRouteEnter(to, from, next) {
      onRouteGuard('beforeEnter', to, from, next);
    },
    beforeRouteLeave(to, from, next) {
      onRouteGuard('beforeLeave', to, from, next);
    },
  });

  return {
    routeGuards,
  };
};

export default installRouteGuard;
export { RouteGuardKey };
export type { RouteGuards };
