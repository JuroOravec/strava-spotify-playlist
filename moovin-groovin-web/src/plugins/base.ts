import type { VueConstructor } from 'vue';

const installBase = (vueClass: VueConstructor): void => {
  vueClass.config.productionTip = false;
};

export default installBase;
