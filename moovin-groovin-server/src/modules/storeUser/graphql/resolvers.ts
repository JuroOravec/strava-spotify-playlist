import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { isNil } from 'lodash';

import {
  ServerModule,
  assertContext,
  Handlers,
} from '../../../lib/ServerModule';
import type { GqlResolvers } from '../../../types/graphql';
import type { PassportUser } from '../../oauth/types';
import type { StoreUserData } from '../data';
import type { StoreUserServices } from '../services';
import type { StoreUserDeps } from '../types';

function createStoreUserGraphqlResolvers(
  this: ServerModule<StoreUserServices, Handlers, StoreUserData, StoreUserDeps>
): GqlResolvers {
  return {
    Query: {
      getCurrentUser: async (parent, args, context) => {
        if (!context.req.isAuthenticated()) {
          throw new AuthenticationError(
            'User not authenticated. Not authorized to access this resource.'
          );
        }

        const user = context.req.user as PassportUser['user'];

        if (!user.internalUserId) {
          throw new AuthenticationError(
            'Invalid authentication provider used. Expected user to authenticated with either "facebook" or "google"'
          );
        }

        return {
          userId: user.internalUserId,
          email: user.email ?? null,
          nameFamily: user.nameFamily ?? null,
          nameGiven: user.nameGiven ?? null,
          nameDisplay: user.nameDisplay ?? null,
          photo: user.photo ?? null,
        };
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
