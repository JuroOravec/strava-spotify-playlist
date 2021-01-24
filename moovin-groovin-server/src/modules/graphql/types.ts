import type {
  ApolloServerExpressConfig,
  IExecutableSchemaDefinition,
  ExpressContext,
} from 'apollo-server-express';

import type { OptionalArray } from '../../types';
import type {
  AnyServerModule,
  ModuleContext,
  ServerModules,
} from '../../lib/ServerModule';

// Note: Names ApolloConfig and ApolloConfigInput are used by ApolloServer
export type GraphqlApolloConfigInputBase = ApolloServerExpressConfig;
export type GraphqlApolloConfigInput = OptionalArray<GraphqlApolloConfigInputBase>;
export type GraphqlApolloConfigInputFn<
  TModules extends ServerModules = ServerModules
> = (ctx: ModuleContext<TModules>) => GraphqlApolloConfigInput;

export type GraphqlSchemaConfig = Omit<
  IExecutableSchemaDefinition,
  'resolvers' | 'typeDefs'
>;
export type GraphqlSchemaConfigInputBase = GraphqlSchemaConfig;
export type GraphqlSchemaConfigInputSimple =
  | GraphqlSchemaConfigInputBase
  | AnyServerModule;
export type GraphqlSchemaConfigInput = OptionalArray<GraphqlSchemaConfigInputSimple>;
export type GraphqlSchemaConfigInputFn<
  TModules extends ServerModules = ServerModules
> = (ctx: ModuleContext<TModules>) => GraphqlSchemaConfigInput;

export interface ResolverContext<TModules extends ServerModules = ServerModules>
  extends ExpressContext {
  appContext: ModuleContext<TModules>;
}
