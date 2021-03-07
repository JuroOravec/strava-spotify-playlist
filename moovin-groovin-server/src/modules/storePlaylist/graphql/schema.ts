import { gql } from 'apollo-server-express';
import type { DocumentNode } from 'graphql';

import type { ServerModule, Handlers } from '../../../lib/ServerModule';
import type { StorePlaylistData } from '../data';
import type { StorePlaylistServices } from '../services';
import type { StorePlaylistDeps } from '../types';

function createStorePlaylistGraphqlSchema(
  this: ServerModule<
    StorePlaylistServices,
    Handlers,
    StorePlaylistData,
    StorePlaylistDeps
  >
): DocumentNode {
  return gql`
    extend type Query {
      getCurrentUserPlaylists: [Playlist!]!
    }

    type Playlist {
      playlistProviderId: String!
      playlistId: String!
      playlistUrl: String
      playlistName: String
      activityProviderId: String!
      activityId: String!
      activityName: String
      activityUrl: String
      dateCreated: Int
    }
  `;
}

export default createStorePlaylistGraphqlSchema;
