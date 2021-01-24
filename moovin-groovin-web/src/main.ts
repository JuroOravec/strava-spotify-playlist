import Vue from 'vue';

import registerServiceWorker from './registerServiceWorker';
import installBase from './plugins/base';
import installCompositionAPI from './plugins/compositionAPI';
import installRouter from './plugins/router';
import installVuetify from './plugins/vuetify';
import createRoutes from './modules/install/routes';
import App from './modules/install/components/App.vue';

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker({
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

// TODO: Add VueApollo and configure apollo client

new Vue({
  name: 'VueApp',
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
