import type { OpenApiValidatorOpts } from 'express-openapi-validator/dist/framework/types';

import type { OpenApiSpecInput, OpenApiSpecInputFn } from './types';

interface OpenApiExternalData {
  apiSpecs: OpenApiSpecInput | OpenApiSpecInputFn<any>;
  specEndpoint: string;
  validatorOptions: Omit<OpenApiValidatorOpts, 'apiSpec'>;
}

interface OpenApiInternalData {
  removeTempFile: (() => void) | null;
  apiSpecFile?: string | null;
}

type OpenApiData = OpenApiInternalData & OpenApiExternalData;

export { OpenApiData, OpenApiExternalData };
