import type { RouteConfig } from 'vue-router';

import ProfileIntegrations from './components/ProfileIntegrations.vue';
import ProfileAccount from './components/ProfileAccount.vue';
import { ProfileRoute } from './types';

const createRoutes = (): (RouteConfig & { name: ProfileRoute })[] => [
  {
    name: ProfileRoute.ACCOUNT,
    path: '/account',
    component: ProfileAccount,
  },
  {
    name: ProfileRoute.PREFERENCES,
    path: '/preferences',
  },
  {
    name: ProfileRoute.INTEGRATIONS,
    path: '/integrations',
    component: ProfileIntegrations,
    meta: {
      requireAuth: false,
    },
  },
  {
    name: ProfileRoute.UNKNOWN,
    path: '/*',
    redirect: { name: ProfileRoute.PREFERENCES },
  },
  {
    name: ProfileRoute.ROOT,
    path: '',
    redirect: { name: ProfileRoute.PREFERENCES },
  },
];

export default createRoutes;
