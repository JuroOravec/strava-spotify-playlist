import type { VueConstructor } from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';

const installRouter = (vueClass: VueConstructor, routerConfig: RouterOptions = {}): VueRouter => {
  vueClass.use(VueRouter);

  const router = new VueRouter(routerConfig);

  return router;
};

export default installRouter;
