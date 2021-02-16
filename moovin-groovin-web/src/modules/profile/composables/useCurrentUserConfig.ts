import { computed, ref, unref, ComputedRef, Ref, readonly } from '@vue/composition-api';
import { gql } from '@apollo/client/core';
import clone from 'lodash/clone';
import memoize from 'lodash/memoize';

import {
  updateCurrentUserConfigMutationCompositionFunctionResult,
  usegetCurrentUserConfigQuery,
  useupdateCurrentUserConfigMutation,
} from '@/plugins/apollo/composables';
import type { GqlgetCurrentUserConfigQuery } from '@/plugins/apollo/types';
import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import useApolloQuery from '@/modules/utils/composables/useApolloQuery';
import useMutationWithNotif from '@/modules/utils/composables/useMutationWithNotif';
import { NotifType } from '@/modules/utils/composables/useNotifSnackbar';

interface UserConfig {
  playlistCollaborative: boolean;
  playlistPublic: boolean;
  playlistAutoCreate: boolean;
  playlistDescriptionTemplate: string | null;
  playlistTitleTemplate: string | null;
  activityDescriptionEnabled: boolean;
  activityDescriptionTemplate: string | null;
}

interface UseCurrentUserConfig {
  config: ComputedRef<Readonly<UserConfig | null>>;
  loading: ComputedRef<boolean>;
  loadingUpdate: ComputedRef<boolean>;
  refetch: () => void;
  updateConfig: updateCurrentUserConfigMutationCompositionFunctionResult['mutate'];
}

// ====================================================
// Query
// ====================================================

const GET_CURRENT_USER_CONFIG = gql`
  query getCurrentUserConfig {
    getCurrentUserConfig {
      playlistCollaborative
      playlistPublic
      playlistAutoCreate
      playlistDescriptionTemplate
      playlistTitleTemplate
      activityDescriptionEnabled
      activityDescriptionTemplate
    }
  }
`;

gql`
  mutation updateCurrentUserConfig($userConfigInput: UserConfigInput!) {
    updateCurrentUserConfig(userConfigInput: $userConfigInput) {
      playlistCollaborative
      playlistPublic
      playlistAutoCreate
      playlistDescriptionTemplate
      playlistTitleTemplate
      activityDescriptionEnabled
      activityDescriptionTemplate
    }
  }
`;

// ====================================================
// Composable
// ====================================================

const transformUserConfig = (
  configData?: GqlgetCurrentUserConfigQuery['getCurrentUserConfig']
): UserConfig | null => {
  if (!configData) return null;
  const { __typename, ...config } = configData;
  return config;
};

const useCurrentUserConfig = (): UseCurrentUserConfig => {
  // Apollo client cache is not Vue-reactive, so when we memoize this composable,
  // pushing new data to the cache won't update the result of query.
  // To work around that, we keep a copy of the state that's sync'd to the cache.
  const configModel: Ref<UserConfig | null> = ref(null);

  const { onResult: onConfig, loading: loadingGetConfig, refetch: refetchConfig } = useApolloQuery(
    usegetCurrentUserConfigQuery
  )({
    fetchPolicy: 'cache-and-network',
  });

  const { mutate: updateConfig, loading: loadingUpdateConfig } = useMutationWithNotif(
    useupdateCurrentUserConfigMutation,
    {
      notifOnError: (errors) => ({
        notifType: NotifType.ERROR,
        attrs: {
          content: `Failed to update preferences. Error: ${errors[0].message}`,
        },
      }),
      notifOnSuccess: {
        notifType: NotifType.CONFIRM,
        attrs: {
          content: 'Preferences updated successfully.',
        },
      },
    }
  )({
    update: (cache, result) => {
      const newConfig = transformUserConfig(result.data?.updateCurrentUserConfig);

      cache.writeQuery({
        query: GET_CURRENT_USER_CONFIG,
        data: { getCurrentUserConfig: clone(newConfig) },
      });

      configModel.value = clone(newConfig);
    },
  });

  const { onLogin, onLogout } = useCurrentUser();

  onConfig(({ data }) => {
    const config = transformUserConfig(data?.getCurrentUserConfig);
    configModel.value = clone(config);
  });

  onLogin(() => refetchConfig());
  onLogout(() => {
    configModel.value = null;
  });

  const isUserConfigLoading = computed(
    (): boolean => unref(loadingGetConfig) || unref(loadingUpdateConfig)
  );

  // NOTE: DO NOT USE `computed` to props read-only when memoizing the composable.
  // It does not work together.
  return {
    config: readonly(configModel),
    updateConfig,
    loading: isUserConfigLoading,
    loadingUpdate: loadingUpdateConfig,
    refetch: refetchConfig,
  };
};

export default memoize(useCurrentUserConfig);
export { GET_CURRENT_USER_CONFIG };
export type { UserConfig };
