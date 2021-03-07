import { gql } from 'apollo-server-express';
import type { DocumentNode } from 'graphql';

import type { ServerModule } from '../../../lib/ServerModule';

function createStoreUserGraphqlSchema(this: ServerModule): DocumentNode {
  return gql`
    extend type Query {
      getAllProviders: [Provider!]!
    }

    # Provider for user auth (=== third party integrations)
    type Provider {
      providerId: String!
      name: String!
      isAuthProvider: Boolean!
      isActivityProvider: Boolean!
      isPlaylistProvider: Boolean!
    }

    enum AuthProvider {
      FACEBOOK
      GOOGLE
    }

    enum PlaylistProvider {
      SPOTIFY
      APPLE
    }

    enum ActivityProvider {
      STRAVA
    }
  `;
}

export default createStoreUserGraphqlSchema;
