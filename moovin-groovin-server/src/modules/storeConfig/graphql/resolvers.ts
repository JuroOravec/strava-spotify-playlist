import { UserInputError } from 'apollo-server-express';
import isNil from 'lodash/isNil';
import validateTemplate from '@moovin-groovin/shared/src/lib/TemplateFormatter/utils/validateTemplate';

import {
  ServerModule,
  assertContext,
  Handlers,
} from '../../../lib/ServerModule';
import type { GqlResolvers, GqlUserConfig } from '../../../types/graphql';
import type { StoreConfigData } from '../data';
import type { StoreConfigServices } from '../services';
import type { StoreConfigDeps, UserConfig } from '../types';
import logger from 'src/lib/logger';

type ConfigTemplates = Pick<
  GqlUserConfig,
  | 'activityDescriptionTemplate'
  | 'playlistDescriptionTemplate'
  | 'playlistTitleTemplate'
>;
type ConfigTemplateProp = keyof ConfigTemplates;

const TEMPLATE_CONFIG_PROPS: ConfigTemplateProp[] = [
  'activityDescriptionTemplate',
  'playlistDescriptionTemplate',
  'playlistTitleTemplate',
];

const transformConfigToGqlConfig = (config: UserConfig): GqlUserConfig => ({
  ...config,
  playlistDescriptionTemplate: config.playlistDescriptionTemplate ?? null,
  playlistTitleTemplate: config.playlistTitleTemplate ?? null,
  activityDescriptionTemplate: config.activityDescriptionTemplate ?? null,
});

const validateConfigTemplates = async <T extends ConfigTemplates>(
  config: T
): Promise<{ key: Extract<keyof T, ConfigTemplateProp>; error: string }[]> => {
  const templateInputs = Object.entries(config).filter(
    ([key, val]) =>
      TEMPLATE_CONFIG_PROPS.includes(key as ConfigTemplateProp) && !isNil(val)
  ) as [ConfigTemplateProp, string][];

  const errors = (
    await Promise.all(
      templateInputs.map(async ([key, template]) => {
        if (!template) return;
        const { error } = await validateTemplate(template);
        if (!error) return;
        return { key, error: error.message };
      })
    )
  ).filter(Boolean) as {
    key: Extract<keyof T, ConfigTemplateProp>;
    error: string;
  }[];

  return errors;
};

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

        const templateErrors = await validateConfigTemplates(userConfigInput);
        if (templateErrors.length) {
          const invalidTemplates = templateErrors
            .map(({ key }): string => key)
            .join(', ');
          throw new UserInputError(`Invalid templates: ${invalidTemplates}`, {
            templateErrors,
          });
        }

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
