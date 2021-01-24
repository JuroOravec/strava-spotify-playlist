import type { RouteConfig } from 'vue-router';

import Navbar from '@/modules/base/components/Navbar.vue';
import { BaseRoute } from './types';
import About from './components/About.vue';

const createRoutes = (): RouteConfig[] => {
  const routes: (RouteConfig & { name: BaseRoute })[] = [
    {
      name: BaseRoute.ABOUT,
      path: '/about',
      component: About,
    },
  ];

  return routes;
};

export default createRoutes;
