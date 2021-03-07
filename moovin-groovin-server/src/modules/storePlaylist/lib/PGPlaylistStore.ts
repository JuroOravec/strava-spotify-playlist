import type { QueryResultRow } from 'pg';
import uniqWith from 'lodash/uniqWith';
import isNil from 'lodash/isNil';
import groupBy from 'lodash/groupBy';

import PGStore from '../../../lib/PGStore';
import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import type {
  PlaylistStore,
  UserActivityPlaylistModel,
  UserActivityPlaylistInput,
  UserActivityPlaylistMeta,
  UserActivityPlaylistUpdate,
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
  playlistProviderId: userPlaylist.playlist_provider_id,
  playlistId: userPlaylist.playlist_id,
});

const transformUserActivityPlaylistResponse = (
  userPlaylist: UserActivityPlaylistResponse
): UserActivityPlaylistModel => ({
  ...transformUserActivityPlaylistMetaResponse(
    userPlaylist as UserActivityPlaylistMetaResponse
  ),
  activityProviderId: userPlaylist.activity_provider_id,
  activityId: userPlaylist.activity_id,
  activityName: userPlaylist.activity_name,
  playlistName: userPlaylist.playlist_name,
  playlistUrl: userPlaylist.playlist_url,
  dateCreated: userPlaylist.date_created,
  tracksAssigned: userPlaylist.tracks_assigned,
});

const dedupeUserPlaylistInput = (
  userPlaylistData: UserActivityPlaylistInput[]
): UserActivityPlaylistInput[] => {
  // Dedupe keep the last version on conflict
  const dedupedReversed = uniqWith(
    [...userPlaylistData].reverse(),
    (userTrackA, userTrackB) =>
      userTrackA.playlistProviderId === userTrackB.playlistProviderId &&
      userTrackA.playlistId === userTrackB.playlistId
  );
  return dedupedReversed.reverse();
};

const isPlaylistResponse = (
  playlist: UserActivityPlaylistResponse | QueryResultRow
): playlist is UserActivityPlaylistResponse =>
  !isNil(playlist?.internal_user_id) &&
  !isNil(playlist?.playlist_provider_id) &&
  !isNil(playlist?.playlist_id);

class PGPlaylistStore
  extends PGStore<PlaylistStoreSQLQueries>
  implements PlaylistStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
  }

  async deleteByUserActivities(
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    const { rows: playlists } = await this.query(
      'deleteUserActivityPlaylistsByUserActivities',
      data.map(
        (d) => [d.internalUserId, d.activityProviderId, d.activityId] as const
      ),
      transformUserActivityPlaylistMetaResponse
    );

    return alignResultWithInput({
      input: { value: data, alignBy: (d) => d.internalUserId },
      result: { value: playlists, alignBy: (p) => p.internalUserId },
      missing: null,
    });
  }

  async getByUsers(
    input: {
      internalUserId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel[] | null)[]> {
    const { rows: playlists } = await this.query(
      'getUserActivityPlaylistsByUsers',
      input.map((d) => [d.internalUserId] as const),
      (playlist) =>
        isPlaylistResponse(playlist)
          ? transformUserActivityPlaylistResponse(playlist)
          : null
    );

    const groups = Object.entries(
      groupBy(playlists, (val) => (isNil(val) ? 'null' : val.internalUserId))
    ) as [string, UserActivityPlaylistModel[] | null][];

    return alignResultWithInput({
      input: { value: input, alignBy: (d) => d.internalUserId },
      result: { value: groups, alignBy: ([key]) => key },
      missing: null,
    }).map((keyValOrNull) => (keyValOrNull ? keyValOrNull[1] : null));
  }

  async getByUserActivities(
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel | null)[]> {
    const { rows: playlists } = await this.query(
      'getUserActivityPlaylistsByUserActivities',
      data.map(
        (d) => [d.internalUserId, d.activityProviderId, d.activityId] as const
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
          userPlaylist.activityProviderId,
          userPlaylist.activityId,
          userPlaylist.activityName,
          userPlaylist.playlistProviderId,
          userPlaylist.playlistId,
          userPlaylist.playlistName,
          userPlaylist.playlistUrl,
          userPlaylist.dateCreated,
          userPlaylist.tracksAssigned,
        ] as const
    );

    const { rows: playlists } = await this.query(
      'insertUserActivityPlaylists',
      values,
      transformUserActivityPlaylistMetaResponse
    );

    const alignBy = (
      d: Pick<UserActivityPlaylistInput, 'playlistProviderId' | 'playlistId'>
    ): string => `${d.playlistProviderId}__${d.playlistId}`;

    return alignResultWithInput({
      input: { value: userPlaylistData, alignBy },
      result: { value: playlists, alignBy },
      missing: null,
    });
  }

  async updateTracksAssigned(
    data: Pick<
      UserActivityPlaylistInput,
      'playlistProviderId' | 'playlistId' | 'tracksAssigned'
    >[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    return this.update(data);
  }

  async update(
    data: UserActivityPlaylistUpdate[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    const { rows: playlists } = await this.query(
      'updateUserActivityPlaylistsTracksAssigned',
      data.map(
        (p) =>
          [
            p.playlistProviderId,
            p.playlistId,
            p.activityName,
            p.playlistName,
            p.playlistUrl,
            p.dateCreated,
            p.tracksAssigned,
          ] as const
      ),
      transformUserActivityPlaylistMetaResponse
    );

    const alignBy = (
      d: Pick<UserActivityPlaylistInput, 'playlistProviderId' | 'playlistId'>
    ): string => `${d.playlistProviderId}__${d.playlistId}`;

    return alignResultWithInput({
      input: { value: data, alignBy },
      result: { value: playlists, alignBy },
      missing: null,
    });
  }
}

export default PGPlaylistStore;
