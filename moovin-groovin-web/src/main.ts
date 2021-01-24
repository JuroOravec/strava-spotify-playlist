import Vue from 'vue';

import installServiceWorker from './plugins/serviceWorker';
import installBase from './plugins/base';
import installCompositionAPI from './plugins/compositionAPI';
import installRouter from './plugins/router';
import installVuetify from './plugins/vuetify';
import installApollo from './plugins/apollo';
import createRoutes from './modules/install/routes';
import App from './modules/install/components/App.vue';

if (process.env.NODE_ENV === 'production') {
  installServiceWorker({
    baseUrl: process.env.BASE_URL,
  });
}
installBase(Vue);
installCompositionAPI(Vue);
const vuetify = installVuetify(Vue);
const router = installRouter(Vue, {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: createRoutes(),
});
const { provider: apolloProvider } = installApollo(Vue);

new Vue({
  name: 'VueApp',
  router,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
