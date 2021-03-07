import { AuthenticationError, ApolloError } from 'apollo-server-express';
import type { Request } from 'express';
import isNil from 'lodash/isNil';
import includes from 'lodash/includes';

import { safeInvoke } from '@moovin-groovin/shared';
import {
  ServerModule,
  assertContext,
  Handlers,
} from '../../../lib/ServerModule';
import { AuthProvider } from '../../../types';
import type {
  GqlResolvers,
  GqlUser,
  GqlProvider,
} from '../../../types/graphql';
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

const authProviderIds = Object.values(AuthProvider);

const getCurrentUser = (
  req: Request,
  transformer: (req: Request) => Express.User
) => {
  const { result: user } = safeInvoke(
    () => transformer(req),
    (err) => {
      throw new AuthenticationError(err.message);
    }
  );
  return user;
};

function createStoreUserGraphqlResolvers(
  this: ServerModule<StoreUserServices, Handlers, StoreUserData, StoreUserDeps>
): GqlResolvers {
  return {
    Query: {
      getCurrentUser: async (parent, args, context) => {
        const user = getCurrentUser(
          context.req,
          this.services.getCurrentAuthenticatedUser
        );
        return transformUserToGqlUser(user);
      },
    },

    Mutation: {
      deleteCurrentUser: async (parent, args, context) => {
        const user = getCurrentUser(
          context.req,
          this.services.getCurrentAuthenticatedUser
        );
        await this.services.deleteUser(user.internalUserId);
        context.req.logout();
        return transformUserToGqlUser(user);
      },

      deleteCurrentUserProviders: async (parent, { providerIds }, context) => {
        const user = getCurrentUser(
          context.req,
          this.services.getCurrentAuthenticatedUser
        );

        assertContext(this.context);
        const {
          deleteTokensByUsersAndProviders,
          getTokensByUser,
        } = this.context.modules.storeToken.services;
        const removedTokens = await deleteTokensByUsersAndProviders(
          providerIds
            .filter((providerId) => !includes(authProviderIds, providerId))
            .map((providerId) => ({
              internalUserId: user.internalUserId,
              providerId,
            }))
        );

        // Log user out if there are no more tokens
        const remainingTokens = await getTokensByUser(user.internalUserId);
        const authTokens =
          remainingTokens?.filter((t) =>
            includes(authProviderIds, t?.providerId)
          ) ?? [];

        if (!authTokens.length) {
          context.req.logout();
        }

        return removedTokens;
      },

      logoutCurrentUser: async (parent, args, context) => {
        const user = getCurrentUser(
          context.req,
          this.services.getCurrentAuthenticatedUser
        );
        context.req.logout();
        return transformUserToGqlUser(user);
      },
    },

    User: {
      providers: async (user): Promise<Pick<GqlProvider, 'providerId'>[]> => {
        assertContext(this.context);
        const { getTokensByUser } = this.context.modules.storeToken.services;

        if (isNil(user?.userId)) {
          throw new ApolloError('Cannot find "userId".');
        }

        const providers = await getTokensByUser(user.userId);
        return providers ?? [];
      },
    },
  };
}

export default createStoreUserGraphqlResolvers;
