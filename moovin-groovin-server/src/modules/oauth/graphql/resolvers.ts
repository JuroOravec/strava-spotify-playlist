import capitalize from 'lodash/capitalize';
import includes from 'lodash/includes';

import { ServerModule } from '../../../lib/ServerModule';
import {
  AuthProvider,
  ActivityProvider,
  PlaylistProvider,
} from '../../../types';
import type { GqlResolvers } from '../../../types/graphql';
import { OAuthData } from '../data';
import { OAuthHandlers } from '../handlers';
import { OAuthServices } from '../services';

const authProviderIds = Object.values(AuthProvider);
const activityProviderIds = Object.values(ActivityProvider);
const playlistProviderIds = Object.values(PlaylistProvider);

function createOAuthGraphqlResolvers(
  this: ServerModule<OAuthServices, OAuthHandlers, OAuthData>
): GqlResolvers {
  return {
    AuthProvider,
    PlaylistProvider,
    ActivityProvider,

    Query: {
      getAllProviders: () =>
        this.data.resolvedProviders?.map(({ providerId }) => ({
          providerId,
        })) ?? [],
    },

    Provider: {
      name: (parent) => capitalize(parent.providerId),
      isActivityProvider: (parent) =>
        includes(activityProviderIds, parent.providerId),
      isAuthProvider: (parent) => includes(authProviderIds, parent.providerId),
      isPlaylistProvider: (parent) =>
        includes(playlistProviderIds, parent.providerId),
    },
  };
}

export default createOAuthGraphqlResolvers;
