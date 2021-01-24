import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import isNil from 'lodash/isNil';

import type { OptionalArray } from '../../../types';
import ServerModule, { AnyServerModule } from '../../../lib/ServerModule';
import type {
  OpenApiSpecInput,
  OpenApiSpecInputSimple,
  OpenApiSpecInputBase,
} from '../types';
import mergeSpecs from './mergeSpecs';

const getModuleSpec = (
  mod: AnyServerModule
): OptionalArray<OpenApiSpecInputBase> | null => mod.openapi?.() || null;

const resolveSpecs = (
  ...specValues: OpenApiSpecInput[]
): OpenAPIV3.Document | undefined => {
  const normSpecValues = ([] as unknown[])
    .concat(...specValues)
    .filter(Boolean) as OpenApiSpecInputSimple[];

  const specs = normSpecValues.reduce<OpenApiSpecInputBase[]>(
    (aggSpecs, specOrModule) => {
      if (!isNil(specOrModule) && !(specOrModule instanceof ServerModule)) {
        return aggSpecs.concat(specOrModule);
      }

      const moduleSpecs = ([] as OpenApiSpecInputBase[])
        .concat(getModuleSpec(specOrModule) || [])
        .filter(Boolean);
      return aggSpecs.concat(moduleSpecs);
    },
    []
  );

  const resolvedSpec = mergeSpecs(specs);
  return resolvedSpec;
};

export default resolveSpecs;
