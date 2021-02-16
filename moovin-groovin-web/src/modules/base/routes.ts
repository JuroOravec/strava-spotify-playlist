import type { RouteConfig } from 'vue-router';

import { BaseRoute } from './types';
import Home from './components/Home.vue';

const createRoutes = (): RouteConfig[] => {
  const routes: (RouteConfig & { name: BaseRoute })[] = [
    {
      name: BaseRoute.UNKNOWN,
      path: '/*',
      redirect: { name: BaseRoute.HOME },
    },
    {
      name: BaseRoute.HOME,
      path: '',
      components: {
        default: Home,
      },
      meta: {
        requireAuth: false,
      },
    },
  ];

  return routes;
};

export default createRoutes;
