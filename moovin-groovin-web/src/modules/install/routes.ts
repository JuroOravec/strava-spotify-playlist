import type { RouteConfig } from 'vue-router';

import addChildRoutes from '@/plugins/router/utils/addChildRoutes';
import createDashboardRoutes from '@/modules/dashboard/routes';
import createProfileRoutes from '@/modules/profile/routes';
import createAuthRoutes from '@/modules/auth/routes';
import createBaseRoutes from '@/modules/base/routes';
import createNewsRoutes from '@/modules/news/routes';
import Appbar from '@/modules/base/components/Appbar.vue';
import AppFooter from '@/modules/base/components/AppFooter.vue';

/**
 * We omit `name`s so child routes can specify the default routes instead.
 *
 * If we include `name`s, we get following warning:
 *
 * [vue-router] Named Route 'root:root' has a default child route. When navigating
 * to this named route (:to="{name: 'root:root'"), the default child route will not
 * be rendered. Remove the name from this route and use the name of the default child
 * route for named links instead.
 */
type RouteConfigWithoutName = { name?: never } & RouteConfig;

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const loadProfilePage = () =>
  import(/* webpackChunkName: "profile" */ '@/modules/profile/components/ProfilePage.vue');
const loadBasePage = () =>
  import(/* webpackChunkName: "base" */ '@/modules/base/components/Page.vue');
const loadDashboardPage = () =>
  import(/* webpackChunkName: "dashboard" */ '@/modules/dashboard/components/DashboardPage.vue');
const loadNewsPage = () =>
  import(/* webpackChunkName: "news" */ '@/modules/base/components/Page.vue');

/**
 * Configure path prefixes.
 *
 * See https://github.com/vuejs/vue-router/issues/2105
 */
const createRoutes = (): RouteConfig[] => {
  const routes: RouteConfigWithoutName[] = [
    {
      path: '/auth',
      children: createAuthRoutes(),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/profile',
      components: {
        default: loadProfilePage,
        appbar: Appbar,
        footer: AppFooter,
      },
      children: createProfileRoutes(),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/dashboard',
      components: {
        default: loadDashboardPage,
        appbar: Appbar,
        footer: AppFooter,
      },
      children: createDashboardRoutes(),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/news',
      components: {
        default: loadNewsPage,
        appbar: Appbar,
        footer: AppFooter,
      },
      children: createNewsRoutes(),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '',
      children: createBaseRoutes(),
      components: {
        default: loadBasePage,
        appbar: Appbar,
        footer: AppFooter,
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/*',
      redirect: '/',
    },
  ].map((route) => (route.children?.length ? addChildRoutes(route, route.children) : route));

  return routes;
};

export default createRoutes;
