import type { ApolloServerExpressConfig } from 'apollo-server-express';
import mergeWith from 'lodash/mergeWith';
import isNil from 'lodash/isNil';

import type { OptionalArray } from '../../../../../moovin-groovin-shared/src/types/optionals';
import ServerModule, { AnyServerModule } from '../../../lib/ServerModule';
import type {
  GraphqlApolloConfigInput,
  GraphqlApolloConfigInputBase,
  GraphqlApolloConfigInputSimple,
} from '../types';

const getModuleConfig = (
  mod: AnyServerModule
): OptionalArray<GraphqlApolloConfigInputBase> | null =>
  mod.graphql?.() || null;

const mergeApolloConfigs = (
  configs: ApolloServerExpressConfig[]
): ApolloServerExpressConfig => {
  const mergedConfig = configs.reduce<ApolloServerExpressConfig>(
    (aggConfig, currConfig) =>
      mergeWith(aggConfig, currConfig, (objValue, srcValue) => {
        if (Array.isArray(objValue)) return objValue.concat(srcValue);
      }),
    {
      // Set empty arrays for defaults so we force fields that could be both
      // an array or a single value to be all arrays.
      validationRules: [],
      extensions: [],
      plugins: [],
      modules: [],
      typeDefs: [],
      resolvers: [],
    }
  );

  return mergedConfig;
};

const resolveApolloConfigs = (
  ...configValues: (GraphqlApolloConfigInput | undefined | void)[]
): ApolloServerExpressConfig => {
  const normConfigValues = ([] as unknown[])
    .concat(...configValues)
    .filter(Boolean) as GraphqlApolloConfigInputSimple[];

  const configs = normConfigValues.reduce<GraphqlApolloConfigInputBase[]>(
    (aggConfigs, configOrModule) => {
      if (!isNil(configOrModule) && !(configOrModule instanceof ServerModule)) {
        return aggConfigs.concat(configOrModule);
      }

      const moduleConfigs = ([] as GraphqlApolloConfigInputBase[])
        .concat(getModuleConfig(configOrModule) || [])
        .filter(Boolean);
      return aggConfigs.concat(moduleConfigs);
    },
    []
  );

  const resolvedConfigs = mergeApolloConfigs(configs);
  return resolvedConfigs;
};

export default resolveApolloConfigs;
