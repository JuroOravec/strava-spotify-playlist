import unionWith from 'lodash/unionWith';
import min from 'lodash/min';
import max from 'lodash/max';
import isNil from 'lodash/isNil';
import orderBy from 'lodash/orderBy';

import wait from '../../utils/wait';
import unixTimestamp from '../../utils/unixTimestamp';
import ServerModule, {
  assertContext,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import type { UserTrackInput, UserTrackModel } from '../storeTrack/types';
import type { UserTokenModel } from '../storeToken/types';
import type { SpotifyHistoryData } from './data';
import type { SpotifyHistoryDeps } from './types';

interface SpotifyHistoryServices extends Services {
  getTrackHistoryTokens: () => Promise<UserTokenModel[]>;
  onTrackHistoryTick: () => Promise<void>;
  getPlayedTracks: (
    providerUserId: string,
    options: PlayedTracksOptions
  ) => Promise<UserTrackModel[]>;
}

interface PlayedTracksOptions {
  before?: number;
  after?: number;
  inclusive?: boolean;
}

type ThisModule = ServerModule<
  SpotifyHistoryServices,
  Handlers,
  SpotifyHistoryData,
  SpotifyHistoryDeps
>;

const createSpotifyHistoryServices = (): SpotifyHistoryServices => {
  /** Tokens of users whose tracks we are caching */
  async function getTrackHistoryTokens(
    this: ThisModule
  ): Promise<UserTokenModel[]> {
    assertContext(this.context);
    const { getTokensByProvider } = this.context.modules.storeToken.services;
    const tokens = await getTokensByProvider('spotify');
    return tokens || [];
  }

  async function onTrackHistoryTick(this: ThisModule) {
    assertContext(this.context);

    const oneDayAgoTimestamp = unixTimestamp() - 60 * 60 * 24;
    const {
      deleteUserTracksOlderThan,
    } = this.context.modules.storeTrack.services;
    await deleteUserTracksOlderThan(oneDayAgoTimestamp);

    (await this.services.getTrackHistoryTokens()).reduce(
      async (aggPromise, { providerUserId, internalUserId }) => {
        await aggPromise;
        assertContext(this.context);

        const {
          getRecentlyPlayedTracks,
        } = this.context.modules.spotify.services;
        const tracks = await getRecentlyPlayedTracks(providerUserId);

        const newTracks = tracks.map(
          (track): UserTrackInput => ({
            internalUserId,
            spotifyTrackId: track.track.id,
            spotifyTrackUri: track.track.uri,
            startTime: unixTimestamp(track.played_at),
          })
        );

        this.context.modules.storeTrack.services.upsertUserTracks(newTracks);

        await wait(this.data.delayPerUser);
      },
      Promise.resolve()
    );
  }

  /**
   * Similar to getRecentlyPlayedTracks, but allows to specify both "before"
   * and "after", and searches for older tracks from the store if the searched
   * time range is beyond what's available from getRecentlyPlayedTracks.
   */
  async function getPlayedTracks(
    this: ThisModule,
    spotifyUserId: string,
    options: PlayedTracksOptions
  ) {
    assertContext(this.context);
    const {
      before: beforeInSec = unixTimestamp(),
      after: afterInSec = 0,
      inclusive,
    } = options;
    const inclusiveBeforeInSec = inclusive ? beforeInSec + 1 : beforeInSec;
    const inclusiveAfterInSec = inclusive ? afterInSec - 1 : afterInSec;

    const spotifyToken = await this.context.modules.storeToken.services.getToken(
      {
        providerId: 'spotify',
        providerUserId: spotifyUserId,
      }
    );

    const { internalUserId } = spotifyToken ?? {};
    if (!internalUserId) {
      throw Error(
        'Failed to match spotify user ID against a user. `getPlayedTracks` will search only Spotify API'
      );
    }

    // Spotify's getRecentlyPlayedTracks endpoint returns max 50 last played tracks.
    // A song has to be played for at least 30 sec to be included in the endpoint.
    // This means that _at worst_ getRecentlyPlayedTracks can get only tracks from the
    // last 25 min (0.5 min * 50 tracks). Assuming a regular song length of 3 min,
    // normally the endpoint should cover tracks from over the last 2.5 hours (3 min * 50).
    //
    // This is still quite limited, assuming a normal Strava activity can last between
    // 30 min to 4 hours. Additionally, we get notified of the Strava activity only once
    // it has been created, which can be hours after the activity took place.
    //
    // To extend the window during which user can create the activity and still have
    // the playlist created for them, we cache user tracks for last 24 hours.
    // The store is updated periodically, so there can be some recently-played tracks
    // which are not in the store at the time when this function is called.
    //
    // Therefore, to get tracks played within some window, we have to check both
    // Spotify's getRecentlyPlayedTracks and our trackStore.
    //
    // "before" limits the search as:
    //
    //   OLDEST   OLDEST
    //   STORE   SPOTIFY  BEFORE    NOW
    // ----|--------|-------|--------|----
    //     |        |<------┘        |      // returned by getRecentlyPlayedTracks
    //     |<-------┘                |      // returned by trackStore
    //
    // "after" limits the search as:
    //
    //   OLDEST        OLDEST
    //   STORE  AFTER  SPOTIFY      NOW
    // ----|------|------|-----------|----
    //     |      |      └---------->|      // returned by getRecentlyPlayedTracks
    //     |      └----->|           |      // returned by trackStore
    //
    // Flow:
    // 1) Get recentlyPlayedTracks from Spotify passing in "before" (or undefined).
    // 2) If "after" is defined and "after" is within the recently played, filter
    //    out tracks _before_ the "after". In this case we're done.
    // 3) Find the oldest played track from recentlyPlayedTracks. If none, assume now().
    //    This will be our "before" that we will pass to the store.
    // 4) Access store, passing our new "before" and the original "after".
    //    If "after" is not defined, assume "after" is 0.
    // 5) Join and dedupe.
    const { getRecentlyPlayedTracks } = this.context.modules.spotify.services;
    const tracks: UserTrackModel[] = (
      await getRecentlyPlayedTracks(spotifyUserId, {
        before: inclusiveBeforeInSec * 1000, // Spotify uses ms-based unix timestamp
      })
    ).map(
      (track): UserTrackModel => ({
        internalUserId,
        spotifyTrackUri: track.track.uri,
        spotifyTrackId: track.track.id,
        startTime: unixTimestamp(track.played_at),
      })
    );

    const oldestTrackPlayedTimestamp = min(
      tracks.map((track) => track.startTime)
    );

    // Prevent user setting negative values since we use 0 as default
    const effectiveAfter = max([inclusiveAfterInSec, 0]) ?? 0;

    const orderTracks = (unordTracks: UserTrackModel[]) =>
      orderBy(unordTracks, [(t) => t.startTime], ['asc']);

    if (
      !isNil(oldestTrackPlayedTimestamp) &&
      effectiveAfter >= oldestTrackPlayedTimestamp
    ) {
      // All requested tracks are within the recentlyPlayedTracks
      return orderTracks(
        tracks.filter((track) => track.startTime > effectiveAfter)
      );
    }

    const { getUserTracksByRange } = this.context.modules.storeTrack.services;
    const oldTracks =
      (await getUserTracksByRange({
        internalUserId,
        after: effectiveAfter,
        before: oldestTrackPlayedTimestamp ?? inclusiveBeforeInSec,
      })) || [];

    const dedupedTracks = unionWith(
      oldTracks ?? [],
      tracks,
      (trackA, trackB) =>
        trackA.internalUserId === trackB.internalUserId &&
        trackA.spotifyTrackId === trackB.spotifyTrackId &&
        trackA.startTime === trackB.startTime
    );

    return orderTracks(dedupedTracks);
  }

  return {
    getTrackHistoryTokens,
    onTrackHistoryTick,
    getPlayedTracks,
  };
};

export default createSpotifyHistoryServices;
export type { SpotifyHistoryServices };
