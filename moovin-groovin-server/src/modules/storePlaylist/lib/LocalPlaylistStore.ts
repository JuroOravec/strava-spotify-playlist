import { isNil } from 'lodash';
import intersectionWith from 'lodash/intersectionWith';

import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import {
  PlaylistStore,
  UserActivityPlaylistModel,
  UserActivityPlaylistInput,
  UserActivityPlaylistMeta,
  UserActivityPlaylistUpdate,
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
          playlistProviderId,
          playlistId,
          internalUserId,
          tracksAssigned,
        } = userPlaylist;
        this.store.set(`${playlistProviderId}__${playlistId}`, {
          ...userPlaylist,
          tracksAssigned: tracksAssigned ?? false,
        });
        return { playlistProviderId, playlistId, internalUserId };
      }
    );
  }

  async updateTracksAssigned(
    data: {
      playlistProviderId: string;
      playlistId: string;
      tracksAssigned: boolean;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    return data.map(({ playlistProviderId, playlistId, tracksAssigned }) => {
      const playlist = this.store.get(`${playlistProviderId}__${playlistId}`);
      if (!playlist) return null;
      playlist.tracksAssigned = tracksAssigned;

      return {
        playlistProviderId,
        playlistId,
        internalUserId: playlist.internalUserId,
      };
    });
  }

  async update(
    data: UserActivityPlaylistUpdate[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    return data.map(
      ({
        playlistProviderId,
        playlistId,
        playlistName,
        playlistUrl,
        tracksAssigned,
        activityName,
        dateCreated,
      }) => {
        const playlist = this.store.get(`${playlistProviderId}__${playlistId}`);
        if (!playlist) return null;

        if (!isNil(playlistName)) playlist.playlistName = playlistName;
        if (!isNil(playlistUrl)) playlist.playlistUrl = playlistUrl;
        if (!isNil(activityName)) playlist.activityName = activityName;
        if (!isNil(dateCreated)) playlist.dateCreated = dateCreated;
        if (!isNil(tracksAssigned)) playlist.tracksAssigned = tracksAssigned;

        return {
          playlistProviderId,
          playlistId,
          internalUserId: playlist.internalUserId,
        };
      }
    );
  }

  async getByUsers(
    input: {
      internalUserId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel[] | null)[]> {
    return input.map(({ internalUserId }) => {
      const playlists = Array.from(this.store.values()).filter(
        (storeVal) => storeVal.internalUserId === internalUserId
      );

      return playlists;
    });
  }

  async getByUserActivities(
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ): Promise<(UserActivityPlaylistModel | null)[]> {
    const playlists = intersectionWith(
      Array.from(this.store.values()),
      data,
      (storeVal, inputVal) =>
        storeVal.internalUserId === inputVal.internalUserId &&
        storeVal.activityProviderId === inputVal.activityProviderId &&
        storeVal.activityId === inputVal.activityId
    );

    const serializeKey = (
      p: Pick<
        UserActivityPlaylistModel,
        'internalUserId' | 'activityId' | 'activityProviderId'
      >
    ) => `${p.internalUserId}__${p.activityProviderId}__${p.activityId}`;

    return alignResultWithInput({
      input: { value: data, alignBy: serializeKey },
      result: { value: playlists, alignBy: serializeKey },
      missing: null,
    });
  }

  async deleteByUserActivities(
    data: {
      internalUserId: string;
      activityProviderId: string;
      activityId: string;
    }[]
  ): Promise<(UserActivityPlaylistMeta | null)[]> {
    const playlists = intersectionWith(
      Array.from(this.store.values()),
      data,
      (storeVal, inputVal) =>
        storeVal.internalUserId === inputVal.internalUserId &&
        storeVal.activityProviderId === inputVal.activityProviderId &&
        storeVal.activityId === inputVal.activityId
    ).map(
      ({
        playlistProviderId,
        playlistId,
        internalUserId,
        activityProviderId,
        activityId,
      }): UserActivityPlaylistMeta &
        Pick<
          UserActivityPlaylistModel,
          'activityProviderId' | 'activityId'
        > => {
        this.store.delete(`${playlistProviderId}__${playlistId}`);
        return {
          internalUserId,
          playlistProviderId,
          playlistId,
          activityProviderId,
          activityId,
        };
      }
    );

    const serializeKey = (
      p: Pick<
        UserActivityPlaylistModel,
        'internalUserId' | 'activityProviderId' | 'activityId'
      >
    ) => `${p.internalUserId}__${p.activityProviderId}__${p.activityId}`;

    return alignResultWithInput({
      input: { value: data, alignBy: serializeKey },
      result: { value: playlists, alignBy: serializeKey },
      missing: null,
    }).map((val) =>
      val
        ? {
            internalUserId: val.internalUserId,
            playlistProviderId: val.playlistProviderId,
            playlistId: val.playlistId,
          }
        : val
    );
  }

  async close(): Promise<void> {
    this.store.clear();
  }
}

export default LocalPlaylistStore;
