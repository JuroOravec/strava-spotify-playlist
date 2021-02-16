import type { RouteConfig } from 'vue-router';

import RoutePassthrough from '../components/RoutePassthrough.vue';

const TRAILING_SLASH_PATTERN = /\/+$/g;

const namespaceRoutes = (namespace: string, routes: RouteConfig[]) =>
  routes.map((route) => {
    const normNamespace = namespace.replace(TRAILING_SLASH_PATTERN, '');
    return {
      ...route,
      path: `${normNamespace}${route.path}`,
    };
  });

const addChildRoutes = <T extends RouteConfig>(parentRoute: T, childRoutes: RouteConfig[]): T => {
  const parentHasSomeComponents = Boolean(
    // @ts-ignore
    parentRoute.component || Object.keys(parentRoute.components || {}).length
  );

  const mergedRoutes: T = {
    ...parentRoute,
    children: namespaceRoutes(parentRoute.path, childRoutes),
    ...(parentHasSomeComponents ? {} : { component: RoutePassthrough }),
  };

  return mergedRoutes;
};

export default addChildRoutes;
