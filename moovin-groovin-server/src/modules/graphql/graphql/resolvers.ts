import type { ServerModule } from '../../../lib/ServerModule';
import type { GqlResolvers } from '../../../types/graphql';

function createRootGraphqlResolvers(this: ServerModule): GqlResolvers {
  const resolvers: GqlResolvers = {
    Query: {
      hello: () => 'Hello from MoovinGroovin!',
    },
    Mutation: {
      hello: () => 'Hello from MoovinGroovin!',
    },
  };

  return resolvers;
}

export default createRootGraphqlResolvers;
