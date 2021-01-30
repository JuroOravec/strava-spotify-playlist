import { computed, ref, unref, ComputedRef } from '@vue/composition-api';
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

  const { mutate: logoutUser, loading: loadingLogoutUser } = uselogoutCurrentUserMutation({
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

  const doLogoutUser = (options?: MutateOverrideOptions) => {
    logoutUser(undefined, options);
  };

  return {
    user,
    loading: isUserLoading,
    refetch,
    deleteUser: doDeleteUser,
    deleteIntegrations: deleteUserIntegrations,
    logout: doLogoutUser,
    isLoggedIn: computed(() => unref(isLoggedIn)),
  };
};

export default memoize(useCurrentUser);
export { GET_CURRENT_USER };
export type { CurrentUser };
