import type { IResolvers } from 'apollo-server-express';

import {
  ServerModule,
  GraphqlCreator,
  Handlers,
} from '../../../lib/ServerModule';
import type { StoreConfigData } from '../data';
import type { StoreConfigServices } from '../services';
import type { StoreConfigDeps } from '../types';
import createResolvers from './resolvers';
import createSchema from './schema';

const createStoreConfigGraphql = (): GraphqlCreator => {
  const createGraphql: GraphqlCreator = function createGraphql(
    this: ServerModule<
      StoreConfigServices,
      Handlers,
      StoreConfigData,
      StoreConfigDeps
    >
  ) {
    return {
      typeDefs: createSchema.apply(this),
      resolvers: createResolvers.apply(this) as IResolvers,
    };
  };

  return createGraphql;
};

export default createStoreConfigGraphql;
