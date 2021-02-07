import {
  ServerModule,
  assertContext,
  Handlers,
} from '../../../lib/ServerModule';
import type { GqlResolvers, GqlUserConfig } from '../../../types/graphql';
import type { StoreConfigData } from '../data';
import type { StoreConfigServices } from '../services';
import type { StoreConfigDeps, UserConfig } from '../types';

const transformConfigToGqlConfig = (config: UserConfig): GqlUserConfig => ({
  ...config,
  playlistDescriptionTemplate: config.playlistDescriptionTemplate ?? null,
  playlistTitleTemplate: config.playlistTitleTemplate ?? null,
  activityDescriptionTemplate: config.activityDescriptionTemplate ?? null,
});

function createStoreConfigGraphqlResolvers(
  this: ServerModule<
    StoreConfigServices,
    Handlers,
    StoreConfigData,
    StoreConfigDeps
  >
): GqlResolvers {
  return {
    Query: {
      getCurrentUserConfig: async (parent, args, context) => {
        assertContext(this.context);
        const {
          getCurrentAuthenticatedUser,
        } = this.context?.modules.storeUser.services;
        const user = getCurrentAuthenticatedUser(context.req);
        const userConfig = await this.services.getUserConfigWithDefaults(
          user.internalUserId
        );
        return transformConfigToGqlConfig(userConfig);
      },
    },

    Mutation: {
      updateCurrentUserConfig: async (parent, { userConfigInput }, context) => {
        const {
          playlistCollaborative,
          playlistPublic,
          playlistAutoCreate,
          activityDescriptionEnabled,
        } = userConfigInput;

        const normUserConfigInput = {
          ...userConfigInput,
          playlistCollaborative: playlistCollaborative ?? undefined,
          playlistPublic: playlistPublic ?? undefined,
          playlistAutoCreate: playlistAutoCreate ?? undefined,
          activityDescriptionEnabled: activityDescriptionEnabled ?? undefined,
        };

        assertContext(this.context);

        const {
          getCurrentAuthenticatedUser,
        } = this.context?.modules.storeUser.services;
        const user = getCurrentAuthenticatedUser(context.req);

        const oldUserConfig = await this.services.getUserConfig(
          user.internalUserId
        );

        if (!oldUserConfig) {
          await this.services.insertUserConfig(
            user.internalUserId,
            normUserConfigInput
          );
        } else {
          await this.services.updateUserConfig(
            user.internalUserId,
            normUserConfigInput
          );
        }

        const userConfig = await this.services.getUserConfigWithDefaults(
          user.internalUserId
        );

        return transformConfigToGqlConfig(userConfig);
      },
    },
  };
}

export default createStoreConfigGraphqlResolvers;
