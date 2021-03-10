import logger from '../../../lib/logger';
import type { UserTrackModel } from '../../storeTrack/types';
import type { EnrichedTrack, PlaylistResponse } from '../types';
import type { UserTrackInput } from '../../../modules/storeTrack/types';

export interface PlaylistProviderApiModule {
  providerId: string;

  getRecentlyPlayedTracks: (input: {
    internalUserId: string;
    providerUserId: string;
    before?: number;
    after?: number;
  }) => Promise<UserTrackInput[]>;
  enrichTracks: (input: {
    providerUserId: string;
    tracks: UserTrackModel[];
  }) => Promise<EnrichedTrack[]>;
  createPlaylist: (input: {
    providerUserId: string;
    playlist: { name: string };
  }) => Promise<PlaylistResponse>;
  getPlaylist: (input: {
    providerUserId: string;
    playlistId: string;
  }) => Promise<PlaylistResponse>;
  addTracksToPlaylist: (input: {
    providerUserId: string;
    playlistId: string;
    tracks: EnrichedTrack[];
  }) => Promise<string[]>;
}

class PlaylistProviderApi {
  modules: PlaylistProviderApiModule[] = [];

  constructor(modules: PlaylistProviderApiModule[]) {
    this.modules = modules;
  }

  async getRecentlyPlayedTracks(input: {
    internalUserId: string;
    providerId: string;
    providerUserId: string;
    after?: number;
    before?: number;
  }): Promise<UserTrackModel[]> {
    const { internalUserId, providerId, providerUserId, before, after } = input;

    const getRecentlyPlayedTracksFn = this.resolveModule(providerId)
      .getRecentlyPlayedTracks;

    logger.debug(`Calling ${providerId} to get recently played tracks`);
    const tracks = await getRecentlyPlayedTracksFn({
      internalUserId,
      providerUserId,
      before,
      after,
    });
    logger.debug(`Done calling ${providerId} to get recently played tracks`);

    if (!tracks) {
      throw Error(`Failed to get tracks from "${providerId}"`);
    }

    return tracks;
  }

  async enrichTracks(input: {
    providerId: string;
    providerUserId: string;
    tracks: UserTrackModel[];
  }): Promise<EnrichedTrack[]> {
    const { providerId, tracks } = input;

    const enrichTracksFn = this.resolveModule(providerId).enrichTracks;

    logger.debug(`Calling ${providerId} to enrich ${tracks.length} tracks`);
    const enrichedTracks = await enrichTracksFn(input).catch((e) => {
      logger.error(e);
      return null;
    });
    logger.debug(
      `Done calling ${providerId} to enrich ${tracks.length} tracks`
    );

    if (!enrichedTracks) {
      throw Error(`Failed to enrich tracks from "${providerId}"`);
    }
    return enrichedTracks;
  }

  async createPlaylist(input: {
    providerId: string;
    providerUserId: string;
    playlist: {
      name: string;
      description?: string;
      collaborative?: boolean;
      public?: boolean;
    };
  }): Promise<PlaylistResponse> {
    const { providerId, providerUserId, playlist: playlistInput } = input;

    const createPlaylistFn = this.resolveModule(providerId).createPlaylist;

    logger.debug(`Calling ${providerId} to create playlist`);
    const playlist = await createPlaylistFn({
      providerUserId,
      playlist: playlistInput,
    }).catch((e) => {
      logger.error(e);
      return null;
    });
    logger.debug(`Done calling ${providerId} to create playlist`);

    if (!playlist) {
      throw Error(`Failed to create playlist in "${providerId}"`);
    }
    return playlist;
  }

  async getPlaylist(input: {
    providerId: string;
    providerUserId: string;
    playlistId: string;
  }): Promise<PlaylistResponse> {
    const { providerId } = input;

    const getPlaylistFn = this.resolveModule(providerId).getPlaylist;

    logger.debug(`Calling ${providerId} to get playlist`);
    const playlist = await getPlaylistFn(input).catch((e) => {
      logger.error(e);
      return null;
    });
    logger.debug(`Done calling ${providerId} to get playlist`);

    if (!playlist) {
      throw Error(`Failed to get playlist from "${providerId}"`);
    }
    return playlist;
  }

  async addTracksToPlaylist(input: {
    providerId: string;
    providerUserId: string;
    playlistId: string;
    tracks: EnrichedTrack[];
  }): Promise<string[]> {
    const { providerId, playlistId, tracks } = input;

    const addTracksToPlaylistFn = this.resolveModule(providerId)
      .addTracksToPlaylist;

    logger.debug(`Calling ${providerId} to add ${tracks.length} playlist`);
    const trackIds = await addTracksToPlaylistFn(input).catch((e) => {
      logger.error(e);
      return null;
    });
    logger.debug(`Done calling ${providerId} to add ${tracks.length} playlist`);

    if (!trackIds) {
      throw Error(
        `Failed to add tracks to "${providerId}" playlist (ID "${playlistId}")`
      );
    }
    return trackIds;
  }

  resolveModule(providerId: string): PlaylistProviderApiModule {
    const provider = this.modules.find((p) => p.providerId === providerId);

    if (!provider) {
      throw Error(
        `No playlist provider available for providerId "${providerId}". Did you include the provider in "playlistProviders" option with "providerId" key?`
      );
    }

    return provider;
  }
}

export default PlaylistProviderApi;
