import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { isNil } from 'lodash';

import { safeInvoke } from '../../../../../moovin-groovin-shared/src/utils/safeInvoke';
import {
  ServerModule,
  assertContext,
  Handlers,
} from '../../../lib/ServerModule';
import type { GqlResolvers, GqlUser } from '../../../types/graphql';
import type { StoreUserData } from '../data';
import type { StoreUserServices } from '../services';
import type { StoreUserDeps } from '../types';

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
        const { result: user } = safeInvoke(
          () => this.services.getCurrentAuthenticatedUser(context.req),
          (err) => {
            throw new AuthenticationError(err.message);
          }
        );
        return transformUserToGqlUser(user);
      },
    },

    Mutation: {
      deleteCurrentUser: async (parent, args, context) => {
        const user = this.services.getCurrentAuthenticatedUser(context.req);
        await this.services.deleteUser(user.internalUserId);
        context.req.logout();
        return transformUserToGqlUser(user);
      },

      deleteCurrentUserProviders: async (parent, { providerIds }, context) => {
        const user = this.services.getCurrentAuthenticatedUser(context.req);

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

      logoutCurrentUser: async (parent, args, context) => {
        const user = this.services.getCurrentAuthenticatedUser(context.req);
        context.req.logout();
        return transformUserToGqlUser(user);
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

export default createStoreUserGraphqlResolvers;
