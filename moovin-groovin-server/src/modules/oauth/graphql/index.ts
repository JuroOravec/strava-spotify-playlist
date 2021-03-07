import type { IResolvers } from 'apollo-server-express';

import type { ServerModule, GraphqlCreator } from '../../../lib/ServerModule';
import type { OAuthData } from '../data';
import type { OAuthHandlers } from '../handlers';
import type { OAuthServices } from '../services';
import createResolvers from './resolvers';
import createSchema from './schema';

const createStoreUserGraphql = (): GraphqlCreator => {
  const createGraphql: GraphqlCreator = function createGraphql(
    this: ServerModule<OAuthServices, OAuthHandlers, OAuthData>
  ) {
    return {
      typeDefs: createSchema.apply(this),
      resolvers: createResolvers.apply(this) as IResolvers,
    };
  };

  return createGraphql;
};

export default createStoreUserGraphql;
