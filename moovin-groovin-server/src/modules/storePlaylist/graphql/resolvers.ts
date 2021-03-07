import { Request } from 'express';
import { AuthenticationError } from 'apollo-server-express';

import { safeInvoke } from '@moovin-groovin/shared';
import {
  ServerModule,
  assertContext,
  Handlers,
} from '../../../lib/ServerModule';
import type { GqlResolvers } from '../../../types/graphql';
import type { StorePlaylistData } from '../data';
import type { StorePlaylistServices } from '../services';
import type { StorePlaylistDeps } from '../types';

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

function createStorePlaylistGraphqlResolvers(
  this: ServerModule<
    StorePlaylistServices,
    Handlers,
    StorePlaylistData,
    StorePlaylistDeps
  >
): GqlResolvers {
  return {
    Query: {
      getCurrentUserPlaylists: async (parent, args, context) => {
        assertContext(this.context);
        const user = getCurrentUser(
          context.req,
          this.context.modules.storeUser.services.getCurrentAuthenticatedUser
        );
        const playlists = await this.services.getUserPlaylistsByUser(user);
        return playlists ?? [];
      },
    },

    Playlist: {
      // TODO: Move this to activityStrava once there is more than one activity provider
      activityUrl: (activity) =>
        activity.activityId
          ? `https://www.strava.com/activities/${activity.activityId}`
          : null,
    },
  };
}

export default createStorePlaylistGraphqlResolvers;
