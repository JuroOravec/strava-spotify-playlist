import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import merge from 'lodash/merge';

import type { OpenApiSpecInput, OpenApiSpecOptions } from '../types';
import readSpecFile from './readSpecFile';

const isOpenApiDoc = (value: unknown): value is OpenAPIV3.Document =>
  Boolean((value as OpenAPIV3.Document)?.openapi);

const normalizeSpec = (
  specOrPath: Exclude<OpenApiSpecInput, any[]>
): OpenApiSpecOptions =>
  typeof specOrPath === 'string' || isOpenApiDoc(specOrPath)
    ? ({ spec: specOrPath } as OpenApiSpecOptions)
    : specOrPath;

const mergeSpecs = (apiSpecs: OpenApiSpecInput): OpenAPIV3.Document => {
  const theApiSpecs = Array.isArray(apiSpecs) ? apiSpecs : [apiSpecs];

  const apiSpec = theApiSpecs.reduce((aggSpec, specOrPath) => {
    const { spec, pathPrefix } = normalizeSpec(specOrPath);

    const newSpec: OpenAPIV3.Document = {
      ...(isOpenApiDoc(spec) ? spec : readSpecFile(spec)),
    };

    if (pathPrefix) {
      newSpec.paths = Object.entries(newSpec.paths).reduce(
        (paths, [key, val]) => {
          return Object.assign(paths, { [`${pathPrefix}${key}`]: val });
        },
        {}
      );
    }

    return merge(aggSpec, newSpec);
  }, {}) as OpenAPIV3.Document;

  return apiSpec;
};

export { mergeSpecs as default };
