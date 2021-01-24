import { AuthenticationError, IResolvers } from 'apollo-server-express';

import {
  ServerModule,
  assertContext,
  Handlers,
} from '../../../lib/ServerModule';
import type { GqlUserProvider, GqlUser } from '../../../types/graphql';
import type { ResolverContext } from '../../graphql/types';
import type { PassportUser } from '../../oauth/types';
import type { StoreUserData } from '../data';
import type { StoreUserServices } from '../services';
import type { StoreUserDeps } from '../types';

function createStoreUserGraphqlResolvers(
  this: ServerModule<StoreUserServices, Handlers, StoreUserData, StoreUserDeps>
): IResolvers {
  return {
    Query: {
      getCurrentUser: async (
        parent,
        args,
        context: ResolverContext
      ): Promise<Omit<GqlUser, 'providers'>> => {
        if (!context.req.isAuthenticated()) {
          throw new AuthenticationError(
            'User not authenticated. Not authorized to access this resource.'
          );
        }

        const user = context.req.user as PassportUser['user'];
        return {
          email: user.email ?? null,
          nameFamily: user.nameFamily ?? null,
          nameGiven: user.nameGiven ?? null,
          nameDisplay: user.nameDisplay ?? null,
          photo: user.photo ?? null,
        };
      },
    },
    User: {
      providers: async (
        parent,
        args,
        context: ResolverContext
      ): Promise<GqlUserProvider[]> => {
        const user = context.req.user as PassportUser['user'];
        if (!user?.internalUserId) {
          throw new Error('Failed to authenticate user.');
        }
        assertContext(this.context);
        const { getTokensByUser } = this.context.modules.storeToken.services;
        const providers = await getTokensByUser(user.internalUserId);
        return providers ?? [];
      },
    },
  };
}

export { createStoreUserGraphqlResolvers as default };
