import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';

import type {
  ServerModule,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import resolveApolloConfigs from './utils/resolveApolloConfigs';
import resolveSchemaConfigs from './utils/resolveSchemaConfigs';
import type { GraphqlData } from './data';
import type { GraphqlResolverContextExtension } from './types';

const createGraphqlInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, GraphqlData>,
    context
  ) {
    const apolloConfig =
      typeof this.data.apolloConfig === 'function'
        ? // Allow user to decide how the modules should be joined
          this.data.apolloConfig(context)
        : this.data.apolloConfig;
    const mergedApolloConfig = resolveApolloConfigs(
      // Use this module's graphql config as the base
      this.graphql(),
      apolloConfig
    );

    const { typeDefs = [], resolvers = [], ...apolloOptions } =
      mergedApolloConfig || {};

    const schemaConfig =
      typeof this.data.schemaConfig === 'function'
        ? // Allow user to decide how the modules should be joined
          this.data.schemaConfig(context)
        : this.data.schemaConfig;
    const mergedSchemaConfig = resolveSchemaConfigs(schemaConfig);

    const schema = makeExecutableSchema({
      ...mergedSchemaConfig,
      typeDefs,
      resolvers,
    });

    this.data.apolloServer = new ApolloServer({
      ...apolloOptions,
      context: (contextArgs): GraphqlResolverContextExtension => {
        const userDefinedContext =
          (typeof apolloOptions.context === 'function'
            ? apolloOptions.context(contextArgs)
            : apolloOptions.context) ?? {};

        return {
          // https://github.com/apollographql/apollo-server/issues/1066#issuecomment-388964078
          ...contextArgs,
          ...userDefinedContext,
          appContext: context,
        };
      },
      schema,
    });
  };

  return install;
};

export { createGraphqlInstaller as default };
