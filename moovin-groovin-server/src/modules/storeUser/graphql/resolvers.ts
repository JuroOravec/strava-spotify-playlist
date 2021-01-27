import type { Request } from 'express';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { isNil } from 'lodash';

import {
  ServerModule,
  assertContext,
  Handlers,
} from '../../../lib/ServerModule';
import type { GqlResolvers, GqlUser } from '../../../types/graphql';
import type { StoreUserData } from '../data';
import type { StoreUserServices } from '../services';
import type { StoreUserDeps } from '../types';

const getCurrentAuthenticatedUser = (req: Request): Express.User => {
  if (!req.isAuthenticated()) {
    throw new AuthenticationError(
      'User not authenticated. Not authorized to access this resource.'
    );
  }
  if (!req.user?.internalUserId) {
    throw new AuthenticationError('Failed to find user.');
  }
  return req.user;
};

const transformUserToGqlUser = (
  user: Express.User
): Omit<GqlUser, 'providers'> => ({
  userId: user.internalUserId,
  email: user.email ?? null,
  nameFamily: user.nameFamily ?? null,
  nameGiven: user.nameGiven ?? null,
  nameDisplay: user.nameDisplay ?? null,
  photo: user.photo ?? null,
});

function createStoreUserGraphqlResolvers(
  this: ServerModule<StoreUserServices, Handlers, StoreUserData, StoreUserDeps>
): GqlResolvers {
  return {
    Query: {
      getCurrentUser: async (parent, args, context) => {
        const user = getCurrentAuthenticatedUser(context.req);
        return transformUserToGqlUser(user);
      },
    },

    Mutation: {
      deleteCurrentUser: async (parent, args, context) => {
        const user = getCurrentAuthenticatedUser(context.req);
        await this.services.deleteUser(user.internalUserId);
        context.req.logout();
        return transformUserToGqlUser(user);
      },

      deleteCurrentUserProviders: async (parent, { providerIds }, context) => {
        const user = getCurrentAuthenticatedUser(context.req);

        assertContext(this.context);
        const {
          deleteTokensByUsersAndProviders,
          getTokensByUser,
        } = this.context.modules.storeToken.services;
        const removedTokens = await deleteTokensByUsersAndProviders(
          providerIds.map((providerId) => ({
            internalUserId: user.internalUserId,
            providerId,
          }))
        );
        // Log user out if there are no more tokens
        // TODO: Search only for the login providers
        const remainingTokens = await getTokensByUser(user.internalUserId);
        if (!remainingTokens?.length) {
          context.req.logout();
        }

        return removedTokens;
      },
    },

    User: {
      providers: async (user) => {
        if (isNil(user?.userId)) {
          throw new ApolloError('Cannot find "userId".');
        }
        assertContext(this.context);
        const { getTokensByUser } = this.context.modules.storeToken.services;
        const providers = await getTokensByUser(user.userId);
        return providers ?? [];
      },
    },
  };
}

export { createStoreUserGraphqlResolvers as default };
