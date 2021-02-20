import type { IResolvers } from 'apollo-server-express';

import type { ServerModule, GraphqlCreator } from '../../../lib/ServerModule';
import typeDefs from './schema';
import createResolvers from './resolvers';

const createRootGraphql = (): GraphqlCreator => {
  const createGraphql: GraphqlCreator = function createGraphql(
    this: ServerModule
  ) {
    const resolvers = createResolvers.call(this) as IResolvers;

    return {
      typeDefs,
      resolvers,
    };
  };

  return createGraphql;
};

export default createRootGraphql;
