import { ComputedRef } from '@vue/composition-api';
import { gql } from '@apollo/client/core';
import { useResult } from '@vue/apollo-composable';
import memoize from 'lodash/memoize';

import { usegetCurrentUserPlaylistsQuery } from '@/plugins/apollo/composables';
import type { GqlgetCurrentUserPlaylistsQuery } from '@/plugins/apollo/types';

interface Playlist {
  playlistProviderId: string;
  playlistId: string;
  playlistUrl: string | null;
  playlistName: string | null;
  activityProviderId: string;
  activityName: string | null;
  activityUrl: string | null;
  dateCreated: number | null;
}

interface UsePlaylists {
  playlists: ComputedRef<readonly Playlist[]>;
  loading: ComputedRef<boolean>;
}

// ====================================================
// Query
// ====================================================

gql`
  query getCurrentUserPlaylists {
    getCurrentUserPlaylists {
      playlistProviderId
      playlistId
      playlistUrl
      playlistName
      activityProviderId
      activityName
      activityUrl
      dateCreated
    }
  }
`;

// ====================================================
// Composable
// ====================================================

const transformPlaylist = (
  playlistData: GqlgetCurrentUserPlaylistsQuery['getCurrentUserPlaylists'][0]
): Playlist => {
  return playlistData;
};

const transformGetCurrentUserPlaylists = ({
  getCurrentUserPlaylists: playlistData,
}: GqlgetCurrentUserPlaylistsQuery): Playlist[] => {
  return playlistData.map(transformPlaylist);
};

const usePlaylists = (): UsePlaylists => {
  const { result, loading } = usegetCurrentUserPlaylistsQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-only',
  });

  const playlists = useResult(result, [] as Playlist[], transformGetCurrentUserPlaylists);

  return {
    playlists,
    loading,
  };
};

export default memoize(usePlaylists);
export type { Playlist };
