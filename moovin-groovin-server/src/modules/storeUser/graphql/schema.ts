import { gql } from 'apollo-server-express';
import type { DocumentNode } from 'graphql';

import type { ServerModule, Handlers } from '../../../lib/ServerModule';
import type { StoreUserData } from '../data';
import type { StoreUserServices } from '../services';
import type { StoreUserDeps } from '../types';

function createStoreUserGraphqlSchema(
  this: ServerModule<StoreUserServices, Handlers, StoreUserData, StoreUserDeps>
): DocumentNode {
  return gql`
    extend type Query {
      getCurrentUser: User!
    }

    extend type Mutation {
      deleteCurrentUser: User!
      deleteCurrentUserProviders(providerIds: [String!]!): [Provider]!
      logoutCurrentUser: User!
    }

    type User {
      userId: String!
      email: String
      nameFamily: String
      nameGiven: String
      nameDisplay: String
      photo: String
      providers: [Provider!]!
    }
  `;
}

export default createStoreUserGraphqlSchema;
