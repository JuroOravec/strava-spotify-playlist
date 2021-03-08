import type { RouteConfig } from 'vue-router';

import { NewsRoute } from './types';
import News from './components/News.vue';

const createRoutes = (): RouteConfig[] => {
  const routes: (RouteConfig & { name: NewsRoute })[] = [
    {
      name: NewsRoute.UNKNOWN,
      path: '/*',
      redirect: { name: NewsRoute.ROOT },
    },
    {
      name: NewsRoute.ROOT,
      path: '',
      components: {
        default: News,
      },
      meta: {
        requireAuth: false,
      },
    },
  ];

  return routes;
};

export default createRoutes;
