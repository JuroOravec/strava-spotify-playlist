import DataLoader from 'dataloader';
import type { IResolvers } from 'apollo-server-express';

import {
  ServerModule,
  GraphqlCreator,
  Handlers,
} from '../../../lib/ServerModule';
import type { StoreUserData } from '../data';
import type { StoreUserServices } from '../services';
import type {
  StoreUserResolverContextExtension,
  StoreUserDeps,
} from '../types';
import createResolvers from './resolvers';
import createSchema from './schema';

const createStoreUserGraphql = (): GraphqlCreator => {
  const createGraphql: GraphqlCreator = function createGraphql(
    this: ServerModule<
      StoreUserServices,
      Handlers,
      StoreUserData,
      StoreUserDeps
    >
  ) {
    return {
      typeDefs: createSchema.apply(this),
      resolvers: createResolvers.apply(this) as IResolvers,
      context: (): StoreUserResolverContextExtension => ({
        userLoader: new DataLoader((userIds) =>
          this.services.getUsers(userIds as string[])
        ),
      }),
    };
  };

  return createGraphql;
};

export default createStoreUserGraphql;
