import type { RouteConfig } from 'vue-router';

import { BaseRoute } from './types';
import About from './components/About.vue';

const createRoutes = (): RouteConfig[] => {
  const routes: (RouteConfig & { name: BaseRoute })[] = [
    {
      name: BaseRoute.ABOUT,
      path: '/about',
      components: {
        default: About,
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      name: BaseRoute.UNKNOWN,
      path: '/*',
      redirect: { name: BaseRoute.HOME },
    },
    {
      name: BaseRoute.HOME,
      path: '',
      components: {
        default: About,
      },
      meta: {
        requireAuth: false,
      },
    },
  ];

  return routes;
};

export default createRoutes;
