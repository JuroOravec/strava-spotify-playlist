import type { RouteConfig } from 'vue-router';

import { AuthRoute } from './types';
import AuthCallback from './components/AuthCallback.vue';

const createRoutes = (): RouteConfig[] => {
  const routes: (RouteConfig & { name: AuthRoute })[] = [
    {
      name: AuthRoute.CALLBACK,
      path: '/callback',
      component: AuthCallback,
      meta: {
        requireAuth: false,
      },
    },
    {
      name: AuthRoute.UNKNOWN,
      path: '/*',
      redirect: '/',
    },
    {
      name: AuthRoute.ROOT,
      path: '',
      redirect: '/',
    },
  ];

  return routes;
};

export default createRoutes;
