import { computed, unref, ComputedRef } from '@vue/composition-api';
import { gql } from '@apollo/client/core';
import { useResult } from '@vue/apollo-composable';
import memoize from 'lodash/memoize';
import groupBy from 'lodash/groupBy';

import { usegetAllProvidersQuery } from '@/plugins/apollo/composables';
import type { GqlgetAllProvidersQuery } from '@/plugins/apollo/types';

enum ProviderTypes {
  ACTIVITY = 'activity',
  PLAYLIST = 'playlist',
  OTHER = 'other',
}

interface Provider {
  providerId: string;
  name: string;
  isActivityProvider: boolean;
  isPlaylistProvider: boolean;
  isAuthProvider: boolean;
}

interface UseProviders {
  providers: ComputedRef<readonly Provider[]>;
  providersByType: ComputedRef<Record<ProviderTypes, Provider[]>>;
  loading: ComputedRef<boolean>;
}

// ====================================================
// Query
// ====================================================

gql`
  query getAllProviders {
    getAllProviders {
      providerId
      name
      isActivityProvider
      isPlaylistProvider
      isAuthProvider
    }
  }
`;

// ====================================================
// Composable
// ====================================================

const transformProvider = ({
  providerId,
  name,
  isActivityProvider,
  isPlaylistProvider,
  isAuthProvider,
}: GqlgetAllProvidersQuery['getAllProviders'][0]): Provider => ({
  name,
  providerId,
  isActivityProvider,
  isPlaylistProvider,
  isAuthProvider,
});

const transformGetAllProviders = ({
  getAllProviders: providersData,
}: GqlgetAllProvidersQuery): Provider[] => {
  return providersData.map(transformProvider);
};

const useProviders = (): UseProviders => {
  const { result, loading: loadingAllProviders } = usegetAllProvidersQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-only',
  });

  const providers = useResult(result, [] as Provider[], transformGetAllProviders);

  const providersByType = computed(
    (): Record<ProviderTypes, Provider[]> =>
      groupBy(unref(providers), (provider) => {
        if (provider.isActivityProvider) return ProviderTypes.ACTIVITY;
        if (provider.isPlaylistProvider) return ProviderTypes.PLAYLIST;
        return ProviderTypes.OTHER;
      }) as Record<ProviderTypes, Provider[]>
  );

  return {
    providers,
    providersByType,
    loading: loadingAllProviders,
  };
};

export default memoize(useProviders);
export { transformProvider };
export type { Provider };
