import toLower from 'lodash/toLower';
import startCase from 'lodash/startCase';
import includes from 'lodash/includes';

import type { ServerModule } from '../../../lib/ServerModule';
import {
  AuthProvider,
  ActivityProvider,
  PlaylistProvider,
} from '../../../types';
import type { GqlResolvers } from '../../../types/graphql';
import type { OAuthData } from '../data';
import type { OAuthHandlers } from '../handlers';
import type { OAuthServices } from '../services';

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
      // Convert to Title Case, see https://stackoverflow.com/a/38084493/9788634
      name: (parent) => startCase(toLower(parent.providerId)),
      isActivityProvider: (parent) =>
        includes(activityProviderIds, parent.providerId),
      isAuthProvider: (parent) => includes(authProviderIds, parent.providerId),
      isPlaylistProvider: (parent) =>
        includes(playlistProviderIds, parent.providerId),
    },
  };
}

export default createOAuthGraphqlResolvers;
