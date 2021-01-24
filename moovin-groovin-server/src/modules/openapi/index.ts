import path from 'path';

import ServerModule, { Services, Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import { OpenApiData, OpenApiExternalData } from './data';

type OpenApiModuleOptions = Partial<OpenApiExternalData>;
type OpenApiModule = ServerModule<Services, Handlers, OpenApiData>;

const createOpenApiModule = (
  options: OpenApiModuleOptions = {}
): OpenApiModule => {
  const {
    apiSpecs = [path.join(__dirname, 'api.yml')],
    specEndpoint = process.env.OPENAPI_SPEC || '/spec',
    validatorOptions = {},
  } = options;

  return new ServerModule({
    name: ServerModuleName.OPENAPI,
    install: createInstaller(),
    close: createCloser(),
    data: {
      ...options,
      apiSpecs,
      specEndpoint,
      validatorOptions,
      removeTempFile: null,
      apiSpecFile: null,
    },
    openapi: path.join(__dirname, './api.yml'),
  });
};

export { createOpenApiModule as default, OpenApiModule, OpenApiModuleOptions };
