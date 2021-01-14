import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import { ServerModules, ModuleContext } from '../../lib/ServerModule';

export type OpenApiSpec = string | OpenAPIV3.Document;
export type OpenApiSpecOptions = { spec: OpenApiSpec; pathPrefix?: string };

export type OpenApiSpecInput =
  | OpenApiSpec
  | OpenApiSpecOptions
  | (OpenApiSpec | OpenApiSpecOptions)[];

export type OpenApiSpecInputFn<
  TModules extends ServerModules = ServerModules
> = (ctx: ModuleContext<TModules>) => OpenApiSpecInput;
