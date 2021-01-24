import merge from 'lodash/merge';
import isNil from 'lodash/isNil';

import type {
  GraphqlSchemaConfigInput,
  GraphqlSchemaConfigInputBase,
  GraphqlSchemaConfig,
} from '../types';

const mergeSchemaConfigs = (
  configs: GraphqlSchemaConfig[]
): GraphqlSchemaConfig => merge({}, ...configs);

const resolveSchemaConfigs = (
  ...configValues: (GraphqlSchemaConfigInput | undefined | void)[]
): GraphqlSchemaConfig => {
  const normConfigValues = ([] as unknown[])
    .concat(...configValues)
    .filter(Boolean) as GraphqlSchemaConfigInputBase[];

  const configs = normConfigValues.reduce<GraphqlSchemaConfigInputBase[]>(
    (aggConfigs, configOrModule) =>
      isNil(configOrModule) ? aggConfigs : aggConfigs.concat(configOrModule),
    []
  );

  const resolvedConfigs = mergeSchemaConfigs(configs);
  return resolvedConfigs;
};

export default resolveSchemaConfigs;
