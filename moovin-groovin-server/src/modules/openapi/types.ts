import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import type { OptionalArray } from '../../types';
import type {
  ServerModules,
  ModuleContext,
  AnyServerModule,
} from '../../lib/ServerModule';

export type OpenApiSpec = string | OpenAPIV3.Document;
export type OpenApiSpecOptions = { spec: OpenApiSpec; pathPrefix?: string };

export type OpenApiSpecInputBase = OpenApiSpec | OpenApiSpecOptions;
export type OpenApiSpecInputSimple = OpenApiSpecInputBase | AnyServerModule;
export type OpenApiSpecInput = OptionalArray<OpenApiSpecInputSimple>;
export type OpenApiSpecInputFn<
  TModules extends ServerModules = ServerModules
> = (ctx: ModuleContext<TModules>) => OpenApiSpecInput;
