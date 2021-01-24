import type { RouteConfig } from 'vue-router';

import ProfileIntegrations from './components/ProfileIntegrations.vue';
import { ProfileRoute } from './types';

const createRoutes = (): (RouteConfig & { name: ProfileRoute })[] => [
  {
    name: ProfileRoute.ACCOUNT,
    path: '/account',
  },
  {
    name: ProfileRoute.PREFERENCES,
    path: '/preferences',
  },
  {
    name: ProfileRoute.INTEGRATIONS,
    path: '/integrations',
    component: ProfileIntegrations,
  },
];

export default createRoutes;
