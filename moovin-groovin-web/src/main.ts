import Vue from 'vue';

import installServiceWorker from './plugins/serviceWorker';
import installBase from './plugins/base';
import installCompositionAPI from './plugins/compositionAPI';
import installRouter from './plugins/router';
import installRouteGuard from './plugins/routeGuard';
import installVuetify from './plugins/vuetify';
import installApollo from './plugins/apollo';
import installConfig from './plugins/config';
import installSentry from './plugins/sentry';
import createRoutes from './modules/install/routes';
import App from './modules/install/components/App.vue';

installSentry(Vue);
if (process.env.NODE_ENV === 'production') {
  installServiceWorker({
    baseUrl: process.env.BASE_URL,
  });
}
installBase(Vue);
installCompositionAPI(Vue);
const { currentConfig } = installConfig(Vue);
const vuetify = installVuetify(Vue);
const router = installRouter(Vue, {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: createRoutes(),
});
installRouteGuard(Vue);
const { provider: apolloProvider } = installApollo(Vue, currentConfig);

new Vue({
  name: 'VueApp',
  router,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
