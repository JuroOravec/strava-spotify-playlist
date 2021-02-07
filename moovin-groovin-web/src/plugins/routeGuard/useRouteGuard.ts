import { getCurrentInstance, inject } from '@vue/composition-api';
import type { NavigationGuard, RawLocation } from 'vue-router';
import isNil from 'lodash/isNil';

import { RouteGuardKey, RouteGuards } from './index';

type RouteGuardStopHandle = () => void;

interface UseRouteGuard {
  beforeRouteEnter: (
    guard: NavigationGuard,
    options?: { route?: RawLocation }
  ) => RouteGuardStopHandle;
  beforeRouteLeave: (
    guard: NavigationGuard,
    options?: { route?: RawLocation }
  ) => RouteGuardStopHandle;
}

const useRouteGuard = (): UseRouteGuard => {
  const routeGuards = inject<RouteGuards>(RouteGuardKey);
  if (!routeGuards) {
    throw Error(
      'Failed to inject route guards. Make sure "useRouteGuard" is called from within Vue setup context and that "routeGuard" plugin is installed.'
    );
  }

  const instance = getCurrentInstance();
  if (!instance) {
    throw Error(
      'Failed to get current Vue component instance. Make sure "useRouteGuard" is called from within the top-level context of a Vue setup function.'
    );
  }

  const addRouteGuard = (
    type: keyof RouteGuards,
    guard: NavigationGuard,
    options: { route?: RawLocation } = {}
  ): RouteGuardStopHandle => {
    const { route } = options;

    const usedRouteName =
      (route && instance.proxy.$router.resolve(route).route.name) ?? instance.proxy.$route.name;

    if (isNil(usedRouteName)) {
      console.warn(
        `[RouteGuard] Failed to add guard to "${type}". Route must be specified with name.`
      );
      return () => {
        /* noop */
      };
    }

    const usedRouteGuards = routeGuards[type][usedRouteName] ?? [];
    routeGuards[type][usedRouteName] = usedRouteGuards;

    usedRouteGuards.push(guard);

    const stopHandle = () => {
      const guardIndex = usedRouteGuards.indexOf(guard);
      if (guardIndex === -1) return;
      usedRouteGuards.splice(guardIndex, 1);
    };

    return stopHandle;
  };

  const addBeforeRouteEnterGuard = (
    guard: NavigationGuard,
    options: { route?: RawLocation } = {}
  ): RouteGuardStopHandle => {
    return addRouteGuard('beforeEnter', guard, options);
  };

  const addBeforeRouteLeaveGuard = (
    guard: NavigationGuard,
    options: { route?: RawLocation } = {}
  ): RouteGuardStopHandle => {
    return addRouteGuard('beforeLeave', guard, options);
  };

  return {
    beforeRouteEnter: addBeforeRouteEnterGuard,
    beforeRouteLeave: addBeforeRouteLeaveGuard,
  };
};

export default useRouteGuard;
export type { RouteGuardStopHandle };
