import path from 'path';

import type { ServerModule, Services, Handlers } from '../../lib/ServerModule';
import readSpecFile from '../openapi/utils/readSpecFile';
import mergeSpecs from '../openapi/utils/mergeSpecs';
import type { OpenApiSpec, OpenApiSpecOptions } from '../openapi/types';
import type { OAuthData } from './data';

const createOpenApiSpec = (): (() => OpenApiSpec) => {
  const openApiSpec = function openApiSpec(
    this: ServerModule<Services, Handlers, OAuthData>
  ): OpenApiSpec {
    const spec = readSpecFile(path.join(__dirname, './api.yml'));

    const providers = this.data.resolvedProviders || [];

    const apiSpecs = providers.map(
      ({ providerId }): OpenApiSpecOptions => ({
        spec,
        pathPrefix: `/${providerId}`,
      })
    );

    return mergeSpecs(apiSpecs);
  };

  return openApiSpec;
};

export { createOpenApiSpec as default };
