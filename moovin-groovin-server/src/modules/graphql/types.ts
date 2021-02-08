import type {
  ApolloServerExpressConfig,
  IExecutableSchemaDefinition,
  ExpressContext,
} from 'apollo-server-express';

import type { OptionalArray } from '../../../../moovin-groovin-shared/src/types/optionals';
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
  TModules extends ServerModules = ServerModules,
  TInput extends GraphqlApolloConfigInput = GraphqlApolloConfigInput
> = (ctx: ModuleContext<TModules>) => TInput;

export type GraphqlSchemaConfig = Omit<
  IExecutableSchemaDefinition,
  'resolvers' | 'typeDefs'
>;
export type GraphqlSchemaConfigInputBase = GraphqlSchemaConfig;
export type GraphqlSchemaConfigInput = OptionalArray<GraphqlSchemaConfigInputBase>;
export type GraphqlSchemaConfigInputFn<
  TModules extends ServerModules = ServerModules,
  TInput extends GraphqlSchemaConfigInput = GraphqlSchemaConfigInput
> = (ctx: ModuleContext<TModules>) => TInput;

export interface GraphqlResolverContextExtension<
  TModules extends ServerModules = ServerModules
> extends ExpressContext {
  appContext: ModuleContext<TModules>;
}

/** Extend the context with user data loader */
declare module '../../types/graphql' {
  /* eslint-disable-next-line @typescript-eslint/no-empty-interface */
  interface ResolverContext<TModules extends ServerModules = ServerModules>
    extends GraphqlResolverContextExtension {}
}
