import type { VueConstructor } from 'vue';
import { provide } from '@vue/composition-api';

import applyMixinOnce from '@/modules/utils/utils/applyMixinOnce';
import createConfig, { ApplicationConfig, EnvironmentConfig } from './config';

const ConfigKey = Symbol('ConfigKey');

const installConfig = (
  vueClass: VueConstructor
): { configs: ApplicationConfig; currentConfig: EnvironmentConfig } => {
  // TODO: Add Vue instance props with the config data?

  const configs = createConfig();

  // TODO: Set the env at webpack processing?
  const currEnv = (process.env.NODE_ENV || 'production') as keyof ApplicationConfig;
  const currentConfig = configs[currEnv];

  applyMixinOnce(vueClass, {
    name: 'ConfigMixin',
    setup() {
      provide<EnvironmentConfig>(ConfigKey, currentConfig);
    },
  });

  return { configs, currentConfig };
};

export default installConfig;
export { ConfigKey };
