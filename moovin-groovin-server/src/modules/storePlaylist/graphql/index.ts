import type { IResolvers } from 'apollo-server-express';

import {
  ServerModule,
  GraphqlCreator,
  Handlers,
} from '../../../lib/ServerModule';
import type { StorePlaylistData } from '../data';
import type { StorePlaylistServices } from '../services';
import type { StorePlaylistDeps } from '../types';
import createResolvers from './resolvers';
import createSchema from './schema';

const createStorePlaylistGraphql = (): GraphqlCreator => {
  const createGraphql: GraphqlCreator = function createGraphql(
    this: ServerModule<
      StorePlaylistServices,
      Handlers,
      StorePlaylistData,
      StorePlaylistDeps
    >
  ) {
    return {
      typeDefs: createSchema.apply(this),
      resolvers: createResolvers.apply(this) as IResolvers,
    };
  };

  return createGraphql;
};

export default createStorePlaylistGraphql;
