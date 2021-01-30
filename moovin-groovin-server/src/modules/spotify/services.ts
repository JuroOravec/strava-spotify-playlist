import type Spotify from 'spotify-web-api-node';
import Queue from 'better-queue';
import chunk from 'lodash/chunk';

import logger from '../../lib/logger';
import ServerModule, {
  assertContext,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import { asyncSafeInvoke } from '../../utils/safeInvoke';
import type { SpotifyData } from './data';
import type {
  RecentlyPlayedTracksOptions,
  SpotifyDeps,
  SpotifyTrack,
} from './types';
import assertSpotify from './utils/assertSpotify';

interface WithAccessTokenContext {
  accessToken: string;
  spotifyClient: Spotify;
}

interface BatchedAddTracksToPlaylistOptions {
  spotifyUserId: string;
  spotifyPlaylistId: string;
  trackUris: string[];
}

interface BatchedGetTracksOptions {
  spotifyUserId: string;
  trackIds: string[];
}

interface SpotifyServices extends Services {
  withAccessToken: <T>(
    providerUserId: string,
    fn: (context: WithAccessTokenContext) => T | Promise<T>
  ) => Promise<T>;
  getRecentlyPlayedTracks: (
    providerUserId: string,
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
  SpotifyServices,
  Handlers,
  SpotifyData,
  SpotifyDeps
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

const createSpotifyServices = (): SpotifyServices => {
  async function withAccessToken<T>(
    this: ThisModule,
    providerUserId: string,
    fn: (context: WithAccessTokenContext) => T | Promise<T>
  ): Promise<T> {
    assertContext(this.context);
    assertSpotify(this.data.spotify);
    const spotifyClient = this.data.spotify;

    const { getAccessToken } = this.context.modules.oauthSpotify.services;
    const accessToken = await getAccessToken(providerUserId);

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
    providerUserId: string,
    options: RecentlyPlayedTracksOptions = {}
  ): Promise<SpotifyTrack[]> {
    return this.services.withAccessToken(
      providerUserId,
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
    options: BatchedAddTracksToPlaylistOptions
  ): Promise<string[]> {
    const { spotifyPlaylistId, trackUris, spotifyUserId } = options;

    // Note: addTracksToPlaylist endpoints accepts max of 100 tracks per request.
    const chunkedTrackUris = chunk(trackUris, 100);

    const snapshots = await this.services.withAccessToken(
      spotifyUserId,
      async ({ spotifyClient }) =>
        chunkedTrackUris.reduce<Promise<string[]>>(
          async (aggPromise, tracksChunk) => {
            const aggArr = await aggPromise;
            const response = await spotifyClient.addTracksToPlaylist(
              spotifyPlaylistId,
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

export default createSpotifyServices;
export type { SpotifyServices };
