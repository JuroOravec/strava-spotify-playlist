import type { ApolloServerExpressConfig } from 'apollo-server-express';
import mergeWith from 'lodash/mergeWith';
import isNil from 'lodash/isNil';

import type { OptionalArray } from '../../../types';
import ServerModule, { AnyServerModule } from '../../../lib/ServerModule';
import type {
  GraphqlApolloConfigInput,
  GraphqlApolloConfigInputBase,
} from '../types';

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
    .filter(Boolean) as GraphqlApolloConfigInputBase[];

  const configs = normConfigValues.reduce<GraphqlApolloConfigInputBase[]>(
    (aggConfigs, configOrModule) =>
      isNil(configOrModule) ? aggConfigs : aggConfigs.concat(configOrModule),
    []
  );

  const resolvedConfigs = mergeApolloConfigs(configs);
  return resolvedConfigs;
};

export default resolveApolloConfigs;
