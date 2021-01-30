import type { RouteConfig } from 'vue-router';

import createProfileRoutes from '@/modules/profile/routes';
import createAuthRoutes from '@/modules/auth/routes';
import createBaseRoutes from '@/modules/base/routes';
import Navbar from '@/modules/base/components/Navbar.vue';
import addChildRoutes from './utils/addChildRoutes';
import { RootRoute } from './types';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const loadProfilePage = () =>
  import(/* webpackChunkName: "profile" */ '@/modules/profile/components/ProfilePage.vue');

/**
 * Configure path prefixes.
 *
 * See https://github.com/vuejs/vue-router/issues/2105
 */
const createRoutes = (): RouteConfig[] => {
  const routes: (RouteConfig & { name: RootRoute })[] = [
    {
      name: RootRoute.AUTH,
      path: '/auth',
      children: createAuthRoutes(),
      meta: {
        requireAuth: false,
      },
    },
    {
      name: RootRoute.PROFILE,
      path: '/profile',
      components: {
        default: loadProfilePage,
        appbar: Navbar,
      },
      children: createProfileRoutes(),
      meta: {
        requireAuth: false,
      },
    },
    {
      name: RootRoute.ROOT,
      path: '',
      children: createBaseRoutes(),
      meta: {
        requireAuth: false,
      },
    },
    {
      name: RootRoute.UNKNOWN,
      path: '/*',
      redirect: '/',
    },
  ].map((route) => (route.children?.length ? addChildRoutes(route, route.children) : route));

  return routes;
};

export default createRoutes;
