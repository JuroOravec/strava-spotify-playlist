import type { RouteConfig } from 'vue-router';

import DashboardPlaylists from './components/DashboardPlaylists.vue';
import { DashboardRoute } from './types';

const createRoutes = (): (RouteConfig & { name: DashboardRoute })[] => [
  {
    name: DashboardRoute.PLAYLISTS,
    path: '/playlists',
    component: DashboardPlaylists,
  },
  {
    name: DashboardRoute.UNKNOWN,
    path: '/*',
    redirect: { name: DashboardRoute.PLAYLISTS },
  },
  {
    name: DashboardRoute.ROOT,
    path: '',
    redirect: { name: DashboardRoute.PLAYLISTS },
  },
];

export default createRoutes;
