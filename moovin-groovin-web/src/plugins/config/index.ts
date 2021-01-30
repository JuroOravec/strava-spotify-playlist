import type { VueConstructor } from 'vue';
import { provide } from '@vue/composition-api';

import createConfig, { ApplicationConfig, EnvironmentConfig } from './config';

const ConfigKey = Symbol('ConfigKey');

const installConfig = (
  vueClass: VueConstructor
): { configs: ApplicationConfig; currentConfig: EnvironmentConfig } => {
  // TODO: Add Vue instance props with the config data?

  const configs = createConfig();
  const currentConfig = configs.development;

  vueClass.mixin({
    name: 'ConfigMixin',
    setup() {
      provide<EnvironmentConfig>(ConfigKey, currentConfig);
    },
  });

  return { configs, currentConfig };
};

export default installConfig;
export { ConfigKey };
