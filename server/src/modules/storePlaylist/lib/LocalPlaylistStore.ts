import intersectionWith from 'lodash/intersectionWith';

import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import type {
  PlaylistStore,
  UserActivityPlaylistModel,
  UserActivityPlaylistInput,
  UserActivityPlaylistMeta,
} from '../types';

class LocalPlaylistStore implements PlaylistStore {
  private store = new Map<string, UserActivityPlaylistModel>();

  async install(): Promise<void> {}

  async insert(
    userPlaylistData: UserActivityPlaylistInput[]
  ): Promise<UserActivityPlaylistMeta[]> {
    return userPlaylistData.map(
      (userPlaylist): UserActivityPlaylistMeta => {
        const {
          spotifyPlaylistId,
          internalUserId,
          tracksAssigned,
        } = userPlaylist;
        this.store.set(spotifyPlaylistId, {
          ...userPlaylist,
          tracksAssigned: tracksAssigned ?? false,
        });
        return { spotifyPlaylistId, internalUserId };
      }
    );
  }

  async updateTracksAssigned(
    data: {
      spotifyPlaylistId: string;
      tracksAssigned: boolean;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    return data.map(({ spotifyPlaylistId, tracksAssigned }) => {
      const playlist = this.store.get(spotifyPlaylistId);
      if (!playlist) return null;
      playlist.tracksAssigned = tracksAssigned;
      return { spotifyPlaylistId, internalUserId: playlist.internalUserId };
    });
  }

  async getByUserActivities(
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel | null)[]> {
    const playlists = intersectionWith(
      Array.from(this.store.values()),
      data,
      (storeVal, inputVal) =>
        storeVal.internalUserId === inputVal.internalUserId &&
        storeVal.stravaActivityId === inputVal.stravaActivityId
    );

    const serializeKey = (
      p: Pick<UserActivityPlaylistModel, 'internalUserId' | 'stravaActivityId'>
    ) => `${p.internalUserId}__${p.stravaActivityId}`;

    return alignResultWithInput({
      input: { value: data, alignBy: serializeKey },
      result: { value: playlists, alignBy: serializeKey },
      missing: null,
    });
  }

  async deleteByUserActivities(
    data: {
      internalUserId: string;
      stravaActivityId: string;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    const playlists = intersectionWith(
      Array.from(this.store.values()),
      data,
      (storeVal, inputVal) =>
        storeVal.internalUserId === inputVal.internalUserId &&
        storeVal.stravaActivityId === inputVal.stravaActivityId
    ).map(
      ({
        spotifyPlaylistId,
        internalUserId,
        stravaActivityId,
      }): UserActivityPlaylistMeta &
        Pick<UserActivityPlaylistModel, 'stravaActivityId'> => {
        this.store.delete(spotifyPlaylistId);
        return {
          internalUserId,
          stravaActivityId,
          spotifyPlaylistId,
        };
      }
    );

    const serializeKey = (
      p: Pick<UserActivityPlaylistModel, 'internalUserId' | 'stravaActivityId'>
    ) => `${p.internalUserId}__${p.stravaActivityId}`;

    return alignResultWithInput({
      input: { value: data, alignBy: serializeKey },
      result: { value: playlists, alignBy: serializeKey },
      missing: null,
    }).map((val) =>
      val
        ? {
            internalUserId: val.internalUserId,
            spotifyPlaylistId: val.spotifyPlaylistId,
          }
        : val
    );
  }

  async close(): Promise<void> {
    this.store.clear();
  }
}

export default LocalPlaylistStore;
