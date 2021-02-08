import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import type { OptionalArray } from '../../../../moovin-groovin-shared/src/types/optionals';
import type {
  ServerModules,
  ModuleContext,
  AnyServerModule,
} from '../../lib/ServerModule';

export type OpenApiSpec = string | OpenAPIV3.Document;
export type OpenApiSpecOptions<
  T extends OpenApiSpec | AnyServerModule = OpenApiSpec
> = { spec: T; pathPrefix?: string };

export type OpenApiSpecInputBase = OpenApiSpec | OpenApiSpecOptions;
export type OpenApiSpecInputSimple =
  | OpenApiSpecInputBase
  | AnyServerModule
  | OpenApiSpecOptions<AnyServerModule>;
export type OpenApiSpecInput = OptionalArray<OpenApiSpecInputSimple>;
export type OpenApiSpecInputFn<
  TModules extends ServerModules = ServerModules,
  TInput extends OpenApiSpecInput = OpenApiSpecInput
> = (ctx: ModuleContext<TModules>) => TInput;
