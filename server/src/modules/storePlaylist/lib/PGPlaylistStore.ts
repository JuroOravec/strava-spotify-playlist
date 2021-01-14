import type { QueryResultRow } from 'pg';
import uniqWith from 'lodash/uniqWith';
import isNil from 'lodash/isNil';

import PGStore from '../../../lib/PGStore';
import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import type {
  PlaylistStore,
  UserActivityPlaylistModel,
  UserActivityPlaylistInput,
  UserActivityPlaylistMeta,
} from '../types';
import {
  getQueries,
  PlaylistStoreSQLQueries,
  UserActivityPlaylistMetaResponse,
  UserActivityPlaylistResponse,
} from '../sql';

const transformUserActivityPlaylistMetaResponse = (
  userPlaylist: UserActivityPlaylistMetaResponse
): UserActivityPlaylistMeta => ({
  internalUserId: userPlaylist.internal_user_id,
  spotifyPlaylistId: userPlaylist.spotify_playlist_id,
});

const transformUserActivityPlaylistResponse = (
  userPlaylist: UserActivityPlaylistResponse
): UserActivityPlaylistModel => ({
  ...transformUserActivityPlaylistMetaResponse(
    userPlaylist as UserActivityPlaylistMetaResponse
  ),
  stravaActivityId: userPlaylist.strava_activity_id,
  spotifyPlaylistId: userPlaylist.spotify_playlist_id,
  spotifyPlaylistUri: userPlaylist.spotify_playlist_uri,
  tracksAssigned: userPlaylist.tracks_assigned,
});

const dedupeUserPlaylistInput = (
  userPlaylistData: UserActivityPlaylistInput[]
): UserActivityPlaylistInput[] => {
  // Dedupe keep the last version on conflict
  const dedupedReversed = uniqWith(
    [...userPlaylistData].reverse(),
    (userTrackA, userTrackB) =>
      userTrackA.spotifyPlaylistId === userTrackB.spotifyPlaylistId
  );
  return dedupedReversed.reverse();
};

const isPlaylistResponse = (
  playlist: UserActivityPlaylistResponse | QueryResultRow
): playlist is UserActivityPlaylistResponse =>
  !isNil(playlist?.internal_user_id) && !isNil(playlist?.spotify_playlist_id);

class PGPlaylistStore
  extends PGStore<PlaylistStoreSQLQueries>
  implements PlaylistStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
    await this.query('createUserActivityPlaylistTable');
  }

  async deleteByUserActivities(
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    const { rows: playlists } = await this.query(
      'deleteUserActivityPlaylistsByUserActivities',
      data.map((d) => [d.internalUserId, d.stravaActivityId] as const),
      transformUserActivityPlaylistMetaResponse
    );

    return alignResultWithInput({
      input: { value: data, alignBy: (d) => d.internalUserId },
      result: { value: playlists, alignBy: (p) => p.internalUserId },
      missing: null,
    });
  }

  async getByUserActivities(
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel | null)[]> {
    const { rows: playlists } = await this.query(
      'getUserActivityPlaylistsByUserActivities',
      data.map(
        ({ internalUserId, stravaActivityId }) =>
          [internalUserId, stravaActivityId] as const
      ),
      (playlist) =>
        isPlaylistResponse(playlist)
          ? transformUserActivityPlaylistResponse(playlist)
          : null
    );

    return playlists;
  }

  async insert(
    userPlaylistData: UserActivityPlaylistInput[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    const values = dedupeUserPlaylistInput(userPlaylistData).map(
      (userPlaylist) =>
        [
          userPlaylist.internalUserId,
          userPlaylist.stravaActivityId,
          userPlaylist.spotifyPlaylistId,
          userPlaylist.spotifyPlaylistUri,
          userPlaylist.tracksAssigned,
        ] as const
    );

    const { rows: playlists } = await this.query(
      'insertUserActivityPlaylists',
      values,
      transformUserActivityPlaylistMetaResponse
    );
    return alignResultWithInput({
      input: { value: userPlaylistData, alignBy: (d) => d.spotifyPlaylistId },
      result: { value: playlists, alignBy: (p) => p.spotifyPlaylistId },
      missing: null,
    });
  }

  async updateTracksAssigned(
    data: {
      spotifyPlaylistId: string;
      tracksAssigned: boolean;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    const { rows: playlists } = await this.query(
      'updateUserActivityPlaylistsTracksAssigned',
      data.map((p) => [p.spotifyPlaylistId, p.tracksAssigned] as const),
      transformUserActivityPlaylistMetaResponse
    );

    return alignResultWithInput({
      input: { value: data, alignBy: (d) => d.spotifyPlaylistId },
      result: { value: playlists, alignBy: (p) => p.spotifyPlaylistId },
      missing: null,
    });
  }
}

export default PGPlaylistStore;
