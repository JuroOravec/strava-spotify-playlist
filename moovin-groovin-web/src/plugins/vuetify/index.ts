import 'material-design-icons-iconfont/dist/material-design-icons.css';
import type { VueConstructor } from 'vue';
import Vuetify from 'vuetify/lib/framework';

import './vuetify.scss';

const installVuetify = (vueClass: VueConstructor): Vuetify => {
  vueClass.use(Vuetify);

  const vuetify = new Vuetify({
    theme: {
      options: {
        customProperties: true,
      },
    },
    icons: {
      iconfont: 'md',
    },
  });

  return vuetify;
};

export default installVuetify;
