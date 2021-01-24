import type { IResolvers } from 'apollo-server-express';

import type { ServerModule } from '../../../lib/ServerModule';
import type { GqlQuery, GqlMutation } from '../../../types/graphql';

function createRootGraphqlResolvers(this: ServerModule): IResolvers {
  const resolvers: IResolvers = {
    Query: {
      hello: (): GqlQuery['hello'] => 'Hello from MoovinGroovin!',
    },
    Mutation: {
      hello: (): GqlMutation['hello'] => 'Hello from MoovinGroovin!',
    },
  };

  return resolvers;
}

export { createRootGraphqlResolvers as default };
