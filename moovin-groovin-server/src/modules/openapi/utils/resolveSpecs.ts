import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import isNil from 'lodash/isNil';

import type { OptionalArray } from '@moovin-groovin/shared';
import ServerModule, { AnyServerModule } from '../../../lib/ServerModule';
import type {
  OpenApiSpecInput,
  OpenApiSpecInputSimple,
  OpenApiSpecInputBase,
  OpenApiSpecOptions,
} from '../types';
import mergeSpecs from './mergeSpecs';

const getModuleSpec = (
  mod: AnyServerModule
): OptionalArray<OpenApiSpecInputBase> | null => mod.openapi?.() || null;

const isSpecOptions = (val: any): val is OpenApiSpecOptions<any> =>
  Boolean(val.spec);

const resolveSpecs = (
  ...specValues: OpenApiSpecInput[]
): OpenAPIV3.Document | undefined => {
  const normSpecValues = ([] as unknown[])
    .concat(...specValues)
    .filter(Boolean) as OpenApiSpecInputSimple[];

  const specs = normSpecValues.reduce<OpenApiSpecInputBase[]>(
    (aggSpecs, specOrModule) => {
      if (isNil(specOrModule)) return aggSpecs;

      // Get spec, which can be either value itself or "spec" field
      let specOptions: OpenApiSpecOptions<any> | null = null;
      if (isSpecOptions(specOrModule)) {
        specOptions = specOrModule;
      }
      const spec = specOptions ? specOptions.spec : specOrModule;

      // No further action required, add what we've received
      if (!(spec instanceof ServerModule)) {
        return aggSpecs.concat(specOptions ?? spec);
      }

      const moduleSpecs = ([] as OpenApiSpecInputBase[])
        .concat(getModuleSpec(spec) || [])
        .filter(Boolean);

      const moduleSpecsWithOptions = specOptions
        ? moduleSpecs.map(
            (currSpec): OpenApiSpecOptions => ({
              ...specOptions,
              ...(isSpecOptions(currSpec) ? currSpec : { spec: currSpec }),
            })
          )
        : moduleSpecs;

      return aggSpecs.concat(moduleSpecsWithOptions);
    },
    []
  );

  const resolvedSpec = mergeSpecs(specs);
  return resolvedSpec;
};

export default resolveSpecs;
