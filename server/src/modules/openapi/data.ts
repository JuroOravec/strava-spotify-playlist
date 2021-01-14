import type { OpenApiValidatorOpts } from 'express-openapi-validator/dist/framework/types';

import type { OpenApiSpecInput, OpenApiSpecInputFn } from './types';

interface OpenApiExternalData {
  apiSpecs: OpenApiSpecInput | OpenApiSpecInputFn<any>;
  specEndpoint: string;
  validatorOptions: Omit<OpenApiValidatorOpts, 'apiSpec'>;
}

interface OpenApiInternalData {
  removeTempFile?: () => void;
  apiSpecFile?: string;
}

type OpenApiData = OpenApiInternalData & OpenApiExternalData;

export { OpenApiData, OpenApiExternalData };
