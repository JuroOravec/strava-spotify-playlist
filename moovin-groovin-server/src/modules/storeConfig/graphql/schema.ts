import { gql } from 'apollo-server-express';
import type { DocumentNode } from 'graphql';

import type { ServerModule, Handlers } from '../../../lib/ServerModule';
import type { StoreConfigData } from '../data';
import type { StoreConfigServices } from '../services';
import type { StoreConfigDeps } from '../types';

function createStoreConfigGraphqlSchema(
  this: ServerModule<
    StoreConfigServices,
    Handlers,
    StoreConfigData,
    StoreConfigDeps
  >
): DocumentNode {
  return gql`
    extend type Query {
      getCurrentUserConfig: UserConfig!
    }

    extend type Mutation {
      updateCurrentUserConfig(userConfigInput: UserConfigInput!): UserConfig!
    }

    type UserConfig {
      "Whether user playlists should be created as collaborative"
      playlistCollaborative: Boolean!
      "Whether user playlists should be created as public"
      playlistPublic: Boolean!
      "Whether user playlists should be created automatically"
      playlistAutoCreate: Boolean!
      "Template for creating playlist description"
      playlistDescriptionTemplate: String
      "Template for creating playlist title"
      playlistTitleTemplate: String
      "Template for creating updated activity description that includes playlist"
      activityDescriptionTemplate: String
    }

    input UserConfigInput {
      "Whether user playlists should be created as collaborative"
      playlistCollaborative: Boolean
      "Whether user playlists should be created as public"
      playlistPublic: Boolean
      "Whether user playlists should be created automatically"
      playlistAutoCreate: Boolean
      "Template for creating playlist description"
      playlistDescriptionTemplate: String
      "Template for creating playlist title"
      playlistTitleTemplate: String
      "Template for creating updated activity description that includes playlist"
      activityDescriptionTemplate: String
    }
  `;
}

export default createStoreConfigGraphqlSchema;
