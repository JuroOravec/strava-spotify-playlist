import type { VueConstructor } from 'vue';
import VueCompositionAPI from '@vue/composition-api';

const installCompositionAPI = (vueClass: VueConstructor): void => {
  vueClass.use(VueCompositionAPI);
};

export default installCompositionAPI;
