import type Spotify from 'spotify-web-api-node';
import Queue from 'better-queue';
import chunk from 'lodash/chunk';

import { asyncSafeInvoke } from '@moovin-groovin/shared';
import ServerModule, {
  assertContext,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { ApiSpotifyData } from './data';
import type {
  RecentlyPlayedTracksOptions,
  ApiSpotifyDeps,
  SpotifyTrack,
} from './types';
import assertSpotify from './utils/assertSpotify';

interface WithAccessTokenContext {
  accessToken: string;
  spotifyClient: Spotify;
}

interface BatchedAddTracksToPlaylistOptions {
  spotifyUserId: string;
  playlistId: string;
  trackUris: string[];
}

interface BatchedGetTracksOptions {
  spotifyUserId: string;
  trackIds: string[];
}

interface ApiSpotifyServices extends Services {
  withAccessToken: <T>(
    spotifyUserId: string,
    fn: (context: WithAccessTokenContext) => T | Promise<T>
  ) => Promise<T>;
  getRecentlyPlayedTracks: (
    spotifyUserId: string,
    options?: RecentlyPlayedTracksOptions
  ) => Promise<SpotifyTrack[]>;
  batchedAddTracksToPlaylist: (
    input: BatchedAddTracksToPlaylistOptions
  ) => Promise<string[]>;
  batchedGetTracks: (
    input: BatchedGetTracksOptions
  ) => Promise<SpotifyApi.TrackObjectFull[]>;
}

type ThisModule = ServerModule<
  ApiSpotifyServices,
  Handlers,
  ApiSpotifyData,
  ApiSpotifyDeps
>;

interface SpotifyClientQueueTask {
  context: WithAccessTokenContext;
  taskFn: (context: WithAccessTokenContext) => unknown | Promise<unknown>;
}

// The SpotifyApi sets the accessToken globally. To ensure that the access token
// is set to the right user for the entirety of the execution of the callback
// passed to withAccessToken, we queue the tasks, so they run one after another.
// See https://github.com/diamondio/better-queue for details.
const spotifyClientQueue = new Queue<SpotifyClientQueueTask, unknown>(
  async ({ context, taskFn }: SpotifyClientQueueTask, cb) => {
    const { spotifyClient, accessToken } = context;

    spotifyClient.setAccessToken(accessToken);
    const { result, error } = await asyncSafeInvoke(() => taskFn(context));
    spotifyClient.resetAccessToken();

    cb(error, result);
  }
);

const createApiSpotifyServices = (): ApiSpotifyServices => {
  async function withAccessToken<T>(
    this: ThisModule,
    spotifyUserId: string,
    fn: (context: WithAccessTokenContext) => T | Promise<T>
  ): Promise<T> {
    assertContext(this.context);
    assertSpotify(this.data.spotify);
    const spotifyClient = this.data.spotify;

    const { getAccessToken } = this.context.modules.oauthSpotify.services;
    const accessToken = await getAccessToken(spotifyUserId);

    return new Promise<T>((res, rej) => {
      spotifyClientQueue
        .push({
          context: { accessToken, spotifyClient },
          taskFn: fn,
        })
        .on('finish', res)
        .on('failed', rej);
    });
  }

  /**
   * Wrapper for SpotifyApi.getMyRecentlyPlayedTracks that uses spotifyUserId
   * to get and set access token.
   */
  async function getRecentlyPlayedTracks(
    this: ThisModule,
    spotifyUserId: string,
    options: RecentlyPlayedTracksOptions = {}
  ): Promise<SpotifyTrack[]> {
    return this.services.withAccessToken(
      spotifyUserId,
      async ({ spotifyClient }) => {
        const { limit = 50 } = options;

        const response = await spotifyClient.getMyRecentlyPlayedTracks({
          ...options,
          limit,
        });

        return response.body.items;
      }
    );
  }

  async function batchedAddTracksToPlaylist(
    this: ThisModule,
    input: BatchedAddTracksToPlaylistOptions
  ): Promise<string[]> {
    const { playlistId, trackUris, spotifyUserId } = input;

    // Note: addTracksToPlaylist endpoints accepts max of 100 tracks per request.
    const chunkedTrackUris = chunk(trackUris, 100);

    const snapshots = await this.services.withAccessToken(
      spotifyUserId,
      async ({ spotifyClient }) =>
        chunkedTrackUris.reduce<Promise<string[]>>(
          async (aggPromise, tracksChunk) => {
            const aggArr = await aggPromise;
            const response = await spotifyClient.addTracksToPlaylist(
              playlistId,
              tracksChunk
            );
            aggArr.push(response.body.snapshot_id);
            return aggArr;
          },
          Promise.resolve([])
        )
    );

    return snapshots;
  }

  async function batchedGetTracks(
    this: ThisModule,
    options: BatchedGetTracksOptions
  ): Promise<SpotifyApi.TrackObjectFull[]> {
    const { trackIds, spotifyUserId } = options;

    // Note: getTracks endpoints accepts max of 50 tracks per request.
    const chunkedTrackIds = chunk(trackIds, 50);

    const tracks = await this.services.withAccessToken(
      spotifyUserId,
      async ({ spotifyClient }) =>
        chunkedTrackIds.reduce<Promise<SpotifyApi.TrackObjectFull[]>>(
          async (aggPromise, tracksChunk) => {
            const aggArr = await aggPromise;
            const response = await spotifyClient.getTracks(tracksChunk);
            const responseTracks = response?.body?.tracks || [];
            aggArr.push(...responseTracks);
            return aggArr;
          },
          Promise.resolve([])
        )
    );

    return tracks;
  }

  return {
    withAccessToken,
    getRecentlyPlayedTracks,
    batchedAddTracksToPlaylist,
    batchedGetTracks,
  };
};

export default createApiSpotifyServices;
export type { ApiSpotifyServices };
