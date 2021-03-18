// @ts-nocheck
import type Spotify from 'spotify-web-api-node';
import isNil from 'lodash/isNil';

import { PlaylistProvider } from '../../types';
import logger from '../../lib/logger';
import ServerModule, {
  assertContext,
  Data,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import unixTimestamp from '../../utils/unixTimestamp';
import type { ApiSpotifyServices } from '../apiSpotify/services';
import type { UserTrackInput, UserTrackModel } from '../storeTrack/types';
import type { EnrichedTrack, PlaylistResponse } from '../playlist/types';
import type { PlaylistAppleDeps } from './types';

type GetRecentlyPlayedTracksArgs = Parameters<
  ApiSpotifyServices['getRecentlyPlayedTracks']
>;

type CreatePlaylistOptions = Parameters<Spotify['createPlaylist']>[2];

interface PlaylistAppleServices
  extends Services,
    Omit<PlaylistProviderApiModule, 'providerId'> {
  getRecentlyPlayedTracks: (
    input: {
      internalUserId: string;
      providerUserId: string;
      before?: number;
      after?: number;
    } & GetRecentlyPlayedTracksArgs[1]
  ) => Promise<UserTrackInput[]>;
  enrichTracks: (input: {
    providerUserId: string;
    tracks: UserTrackModel[];
  }) => Promise<EnrichedTrack[]>;
  createPlaylist: (input: {
    providerUserId: string;
    playlist: { name: string } & CreatePlaylistOptions;
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

type ThisModule = ServerModule<
  PlaylistAppleServices,
  Handlers,
  Data,
  PlaylistAppleDeps
>;

const createPlaylistAppleServices = (): PlaylistAppleServices => {
  const getRecentlyPlayedTracks: PlaylistAppleServices['getRecentlyPlayedTracks'] = async function getRecentlyPlayedTracks(
    this: ThisModule,
    input
  ) {
    assertContext(this.context);
    const { internalUserId, providerUserId, before, after, ...options } = input;

    const apiSpotify = this.context.modules.apiSpotify;
    const rawTracks = await apiSpotify.services.getRecentlyPlayedTracks(
      providerUserId,
      {
        ...options,
        // Convert to ms-based timestamp
        ...(!isNil(before) ? { before: before * 1000 } : {}),
        ...(!isNil(after) ? { after: after * 1000 } : {}),
      }
    );

    return rawTracks.map(
      (track): UserTrackInput => ({
        internalUserId,
        playlistProviderId: PlaylistProvider.APPLE_MUSIC,
        trackId: track.track.id,
        startTime: unixTimestamp(track.played_at),
      })
    );
  };

  async function enrichTracks(
    this: ThisModule,
    input: {
      providerUserId: string;
      tracks: UserTrackModel[];
    }
  ): Promise<EnrichedTrack[]> {
    const { tracks, providerUserId } = input;
    if (!tracks?.length) return [];
    assertContext(this.context);

    const { batchedGetTracks } = this.context.modules.apiSpotify.services;
    const tracksMetadata = await batchedGetTracks({
      spotifyUserId: providerUserId,
      trackIds: tracks
        .filter(
          (track) => track.playlistProviderId === PlaylistProvider.APPLE_MUSIC
        )
        .map((track) => track.trackId),
    });

    const enrichedTracks = tracks.map(
      (track, i): EnrichedTrack => ({
        playlistProviderId: PlaylistProvider.APPLE_MUSIC,
        trackId: tracksMetadata[i]?.id,
        title: tracksMetadata[i]?.name,
        album: tracksMetadata[i]?.album.name,
        artist: tracksMetadata[i]?.artists
          .map((artist) => artist.name)
          .join(', '),
        duration: Math.floor(tracksMetadata[i]?.duration_ms / 1000),
        startTime: track.startTime,
      })
    );

    return enrichedTracks;
  }

  async function createPlaylist(
    this: ThisModule,
    input: {
      providerUserId: string;
      playlist: { name: string } & CreatePlaylistOptions;
    }
  ): Promise<PlaylistResponse> {
    assertContext(this.context);
    const { withAccessToken } = this.context.modules.apiSpotify.services;

    const { providerUserId, playlist } = input;

    return withAccessToken(providerUserId, async ({ spotifyClient }) => {
      // NOTE: Unlike what typings suggest, createPlaylist doesn't accept userId as first arg.
      const playlistResponse = await spotifyClient
        .createPlaylist(
          playlist.name,
          // @ts-ignore
          playlist
        )
        .catch((e) => logger.error(e));

      if (!playlistResponse) {
        throw Error('Failed to create a Spotify playlist');
      }

      return {
        playlistId: playlistResponse.body.id,
        title: playlistResponse.body.name,
        url: playlistResponse.body.external_urls.apple_music,
      };
    });
  }

  async function getPlaylist(
    this: ThisModule,
    input: { providerUserId: string; playlistId: string }
  ): Promise<PlaylistResponse> {
    assertContext(this.context);

    const { providerUserId, playlistId } = input;

    const { withAccessToken } = this.context.modules.apiSpotify.services;
    return withAccessToken(providerUserId, async ({ spotifyClient }) => {
      const playlistResponse = await spotifyClient.getPlaylist(playlistId, {
        fields: 'external_urls,name',
      });

      if (!playlistResponse) {
        throw Error('Failed to get a Spotify playlist');
      }

      return {
        playlistId: playlistResponse.body.id,
        title: playlistResponse.body.name,
        url: playlistResponse.body.external_urls.apple_music,
      };
    });
  }

  async function addTracksToPlaylist(
    this: ThisModule,
    input: {
      providerUserId: string;
      playlistId: string;
      tracks: EnrichedTrack[];
    }
  ): Promise<string[]> {
    assertContext(this.context);
    const {
      batchedAddTracksToPlaylist,
    } = this.context.modules.apiSpotify.services;

    const { providerUserId: spotifyUserId, playlistId, tracks } = input;

    return batchedAddTracksToPlaylist({
      spotifyUserId,
      playlistId,
      // To check if tracks still have this format, get URI of any Spotify song
      trackUris: tracks.map((track) => `spotify:track:${track.trackId}`),
    });
  }

  return {
    getRecentlyPlayedTracks,
    enrichTracks,
    createPlaylist,
    getPlaylist,
    addTracksToPlaylist,
  };
};

export default createPlaylistAppleServices;
export type { PlaylistAppleServices };
