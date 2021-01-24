import {
  ServerModule,
  GraphqlCreator,
  Handlers,
} from '../../../lib/ServerModule';
import type { StoreUserData } from '../data';
import type { StoreUserServices } from '../services';
import type { StoreUserDeps } from '../types';
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
      resolvers: createResolvers.apply(this),
    };
  };

  return createGraphql;
};

export { createStoreUserGraphql as default };
