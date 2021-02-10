import { computed, ref, unref, ComputedRef, readonly } from '@vue/composition-api';
import { gql } from '@apollo/client/core';
import { MutateOverrideOptions, useResult } from '@vue/apollo-composable';
import cloneDeep from 'lodash/cloneDeep';
import memoize from 'lodash/memoize';

import {
  usegetCurrentUserQuery,
  usedeleteCurrentUserMutation,
  usedeleteCurrentUserIntegrationsMutation,
  uselogoutCurrentUserMutation,
} from '@/plugins/apollo/composables';
import type { GqlgetCurrentUserQuery } from '@/plugins/apollo/types';
import isNotNil from '@/modules/utils/utils/isNotNil';
import useWatcher, { UseWatcher } from '@/modules/utils/composables/useWatcher';
import { namedOperations } from '@/plugins/apollo/operations';

interface CurrentUser {
  userId: string;
  email: string | null;
  nameFamily: string | null;
  nameGiven: string | null;
  nameDisplay: string | null;
  photo: string | null;
  providers: string[];
}

interface UseCurrentUser {
  user: ComputedRef<CurrentUser | null>;
  loading: ComputedRef<boolean>;
  refetch: () => void;
  deleteUser: (options?: MutateOverrideOptions) => void;
  deleteIntegrations: (
    variables: { providerIds: string[] },
    options?: MutateOverrideOptions
  ) => void;
  logout: (options?: MutateOverrideOptions) => void;
  onLogin: UseWatcher<CurrentUser | null>['addWatcher'];
  onLogout: UseWatcher<CurrentUser | null>['addWatcher'];
  isLoggedIn: ComputedRef<boolean>;
}

// ====================================================
// Query
// ====================================================

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      userId
      email
      nameFamily
      nameGiven
      nameDisplay
      photo
      providers {
        providerId
      }
    }
  }
`;

gql`
  mutation deleteCurrentUser {
    deleteCurrentUser {
      userId
    }
  }
`;

gql`
  mutation deleteCurrentUserIntegrations($providerIds: [String!]!) {
    deleteCurrentUserProviders(providerIds: $providerIds) {
      providerId
    }
  }
`;

gql`
  mutation logoutCurrentUser {
    logoutCurrentUser {
      userId
    }
  }
`;

// ====================================================
// Composable
// ====================================================

const transformGetCurentUser = ({
  getCurrentUser: userData,
}: GqlgetCurrentUserQuery): CurrentUser => {
  const { __typename, providers, ...user } = userData;
  return {
    ...user,
    providers: providers.map(({ providerId }) => providerId),
  };
};

// TODO: This currently works, because we're not modifying & refetching user data
// and b/c we delete apollo cache when we log user out. But once we allow user to
// modify their data, consider refactoring this to use onResult instead of result,
// similarly to useCurrentUserConfig.
const useCurrentUser = (): UseCurrentUser => {
  const isLoggedIn = ref(false);

  const {
    result,
    loading: loadingGetUser,
    refetch: refetchUser,
    onError,
    onResult,
  } = usegetCurrentUserQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-only',
  });

  const { mutate: deleteUser, loading: loadingDeleteUser } = usedeleteCurrentUserMutation({
    awaitRefetchQueries: true,
    update: (cache) => {
      cache.writeQuery({ query: GET_CURRENT_USER, data: { getCurrentUser: null } });
    },
    refetchQueries: [namedOperations.Query.getCurrentUser],
  });

  const {
    mutate: deleteUserIntegrations,
    loading: loadingDeleteUserIntegrations,
  } = usedeleteCurrentUserIntegrationsMutation({
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      const removedProviders =
        data?.deleteCurrentUserProviders.map((p) => p?.providerId).filter(isNotNil) ?? [];

      const userCopy = cloneDeep(
        cache.readQuery<GqlgetCurrentUserQuery>({ query: GET_CURRENT_USER })?.getCurrentUser ?? null
      );

      if (!userCopy?.providers.length) return;

      userCopy.providers = userCopy.providers.filter(
        (provider) => !removedProviders.includes(provider.providerId)
      );
      cache.writeQuery({ query: GET_CURRENT_USER, data: { getCurrentUser: userCopy } });
    },
    refetchQueries: [namedOperations.Query.getCurrentUser],
  });

  const { mutate: doLogoutUser, loading: loadingLogoutUser } = uselogoutCurrentUserMutation({
    awaitRefetchQueries: true,
    update: (cache) => {
      cache.writeQuery({ query: GET_CURRENT_USER, data: { getCurrentUser: null } });
    },
    refetchQueries: [namedOperations.Query.getCurrentUser],
  });

  const user = useResult(result, null, transformGetCurentUser);

  onError(() => {
    isLoggedIn.value = false;
  });

  onResult(({ data, errors, error }) => {
    isLoggedIn.value = Boolean(data?.getCurrentUser?.userId && !errors?.length && !error);
  });

  const isUserLoading = computed(
    (): boolean =>
      unref(loadingGetUser) ||
      unref(loadingDeleteUser) ||
      unref(loadingDeleteUserIntegrations) ||
      unref(loadingLogoutUser)
  );

  const refetch = (): void => {
    refetchUser();
  };

  const doDeleteUser = (options?: MutateOverrideOptions) => {
    deleteUser(undefined, options);
  };

  const logoutUser = (options?: MutateOverrideOptions) => {
    doLogoutUser(undefined, options);
  };

  const { addWatcher: onLogin } = useWatcher({
    value: user,
    filter: (newUser) => newUser !== null,
  });

  const { addWatcher: onLogout } = useWatcher({
    value: user,
    filter: (newUser) => newUser === null,
  });

  return {
    user,
    loading: isUserLoading,
    isLoggedIn: readonly(isLoggedIn),
    refetch,
    deleteUser: doDeleteUser,
    deleteIntegrations: deleteUserIntegrations,
    logout: logoutUser,
    onLogin,
    onLogout,
  };
};

export default memoize(useCurrentUser);
export { GET_CURRENT_USER };
export type { CurrentUser };
