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
export type GraphqlApolloConfigInputSimple =
  | ApolloServerExpressConfig
  | AnyServerModule;
export type GraphqlApolloConfigInput = OptionalArray<GraphqlApolloConfigInputSimple>;
export type GraphqlApolloConfigInputFn<
  TModules extends ServerModules = ServerModules
> = (ctx: ModuleContext<TModules>) => GraphqlApolloConfigInput;

export type GraphqlSchemaConfig = Omit<
  IExecutableSchemaDefinition,
  'resolvers' | 'typeDefs'
>;
export type GraphqlSchemaConfigInputBase = GraphqlSchemaConfig;
export type GraphqlSchemaConfigInput = OptionalArray<GraphqlSchemaConfigInputBase>;
export type GraphqlSchemaConfigInputFn<
  TModules extends ServerModules = ServerModules
> = (ctx: ModuleContext<TModules>) => GraphqlSchemaConfigInput;

export interface ResolverContext<TModules extends ServerModules = ServerModules>
  extends ExpressContext {
  appContext: ModuleContext<TModules>;
}
