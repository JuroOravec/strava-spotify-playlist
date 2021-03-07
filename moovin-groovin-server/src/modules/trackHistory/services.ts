import unionWith from 'lodash/unionWith';
import min from 'lodash/min';
import max from 'lodash/max';
import isNil from 'lodash/isNil';
import orderBy from 'lodash/orderBy';
import flatMap from 'lodash/flatMap';

import { asyncSafeInvoke } from '@moovin-groovin/shared';
import wait from '../../utils/wait';
import unixTimestamp from '../../utils/unixTimestamp';
import ServerModule, {
  assertContext,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import { PlaylistProvider } from '../../types';
import resolvePlaylistModuleService from '../playlist/utils/resolvePlaylistModuleService';
import type { UserTrackModel } from '../storeTrack/types';
import type { UserTokenModel } from '../storeToken/types';
import type { TrackHistoryData } from './data';
import type { TrackHistoryDeps } from './types';

interface PlayedTracksOptions {
  before?: number;
  after?: number;
  inclusive?: boolean;
}

interface TrackHistoryServices extends Services {
  onTrackHistoryTick: () => Promise<void>;
  getPlayedTracks: (
    input: {
      providers: {
        providerId: string;
        providerUserId: string;
      }[];
    } & PlayedTracksOptions
  ) => Promise<UserTrackModel[]>;
}

type ThisModule = ServerModule<
  TrackHistoryServices,
  Handlers,
  TrackHistoryData,
  TrackHistoryDeps
>;

const orderTracks = (unordTracks: UserTrackModel[]) =>
  orderBy(unordTracks, [(t) => t.startTime], ['asc']);

const createTrackHistoryServices = (): TrackHistoryServices => {
  /** Tokens of users whose tracks we are caching */
  async function getTrackHistoryTokens(
    modules: TrackHistoryDeps
  ): Promise<UserTokenModel[]> {
    const { getTokensByProviders } = modules.storeToken.services;
    const tokens = await getTokensByProviders(Object.values(PlaylistProvider));

    const allTokens: UserTokenModel[] = flatMap(
      tokens,
      (tokens) => tokens ?? []
    );
    return allTokens;
  }

  async function getRecentlyPlayedTracks(input: {
    modules: TrackHistoryDeps;
    internalUserId: string;
    providerId: string;
    providerUserId: string;
    after?: number;
    before?: number;
  }): Promise<UserTrackModel[]> {
    const {
      internalUserId,
      modules,
      providerId,
      providerUserId,
      before,
      after,
    } = input;

    const getRecentlyPlayedTracksFn = resolvePlaylistModuleService({
      modules,
      providerId,
      service: 'getRecentlyPlayedTracks',
    });

    const tracks = await getRecentlyPlayedTracksFn({
      internalUserId,
      providerUserId,
      before,
      after,
    });

    if (!tracks) {
      throw Error(`Failed to get tracks from "${providerId}"`);
    }

    return tracks;
  }

  async function onTrackHistoryTick(this: ThisModule) {
    assertContext(this.context);

    const oneDayAgoTimestamp = unixTimestamp() - 60 * 60 * 24;
    const {
      deleteUserTracksOlderThan,
    } = this.context.modules.storeTrack.services;
    await deleteUserTracksOlderThan(oneDayAgoTimestamp);

    (await getTrackHistoryTokens(this.context.modules)).reduce(
      async (aggPromise, { providerId, providerUserId, internalUserId }) => {
        await aggPromise;
        assertContext(this.context);
        const context = this.context;

        const { result: tracks } = await asyncSafeInvoke(
          () =>
            getRecentlyPlayedTracks({
              internalUserId,
              modules: context.modules,
              providerId,
              providerUserId,
            }),
          (e) => logger.error(e)
        );

        this.context.modules.storeTrack.services.upsertUserTracks(tracks ?? []);

        await wait(this.data.delayPerUpdate);
      },
      Promise.resolve()
    );
  }

  /**
   * Similar to getRecentlyPlayedTracks, but allows to specify both "before"
   * and "after", and searches for older tracks from the store if the searched
   * time range is beyond what's available from getRecentlyPlayedTracks.
   */
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
  async function getPlayedTracks(
    this: ThisModule,
    input: {
      providers: {
        providerId: string;
        providerUserId: string;
      }[];
    } & PlayedTracksOptions
  ) {
    const { providers, ...options } = input;

    logger.debug({
      msg: 'Fetching played tracks',
      providers: providers.map((p) => p.providerId),
    });

    assertContext(this.context);
    const context = this.context;

    const providerIds = providers.map((p) => p.providerId);

    const {
      before: beforeInSec = unixTimestamp(),
      after: afterInSec = 0,
      inclusive,
    } = options;

    const inclusiveBeforeInSec = inclusive ? beforeInSec + 1 : beforeInSec;
    const inclusiveAfterInSec = inclusive ? afterInSec - 1 : afterInSec;

    // Prevent user setting negative values since we use 0 as default
    const effectiveAfter = max([inclusiveAfterInSec, 0]) ?? 0;

    const playlistTokens = await this.context.modules.storeToken.services.getTokens(
      providers
    );

    const internalUserId = playlistTokens.find((t) => t?.internalUserId)
      ?.internalUserId;
    if (!internalUserId) {
      throw Error(
        `Failed to match any of "${providerIds.join(
          '", "'
        )}" user IDs against a user.`
      );
    }

    const tracksGroups = await Promise.all(
      providers.map(async ({ providerId, providerUserId }) => {
        const { result: tracks } = await asyncSafeInvoke(
          () =>
            getRecentlyPlayedTracks({
              internalUserId,
              modules: context.modules,
              providerId,
              providerUserId,
              before: inclusiveBeforeInSec,
            }),
          (e) => logger.error(e)
        );

        const oldestTrackPlayedTimestamp =
          min(tracks?.map((track) => track.startTime) ?? []) ?? null;

        return { tracks, oldestTrackPlayedTimestamp };
      })
    );

    const tracks = flatMap(tracksGroups, (g) => g.tracks).filter(
      (track): track is UserTrackModel => !isNil(track)
    );

    const leastOldestTrackPlayedTimestamp = tracksGroups.find(
      ({ oldestTrackPlayedTimestamp }) => isNil(oldestTrackPlayedTimestamp)
    )
      ? null
      : max(tracksGroups.map((g) => g.oldestTrackPlayedTimestamp)) ?? null;

    if (
      !isNil(leastOldestTrackPlayedTimestamp) &&
      effectiveAfter >= leastOldestTrackPlayedTimestamp
    ) {
      // All requested tracks are within the recentlyPlayedTracks
      return orderTracks(
        tracks?.filter((track) => track.startTime > effectiveAfter) ?? []
      );
    }

    const { getUserTracksByRange } = this.context.modules.storeTrack.services;
    const oldTracks = await getUserTracksByRange({
      internalUserId,
      after: effectiveAfter,
      before: leastOldestTrackPlayedTimestamp ?? inclusiveBeforeInSec,
    });
    const providerOldTracks =
      oldTracks?.filter((track) =>
        providerIds.includes(track.playlistProviderId)
      ) ?? [];

    const dedupedTracks = unionWith(
      providerOldTracks,
      tracks,
      (trackA, trackB) =>
        trackA.internalUserId === trackB.internalUserId &&
        trackA.playlistProviderId === trackB.playlistProviderId &&
        trackA.trackId === trackB.trackId &&
        trackA.startTime === trackB.startTime
    );

    const orderedTracks = orderTracks(dedupedTracks);

    logger.debug(`Found ${orderedTracks.length} played tracks`);

    return orderedTracks;
  }

  return {
    onTrackHistoryTick,
    getPlayedTracks,
  };
};

export default createTrackHistoryServices;
export type { TrackHistoryServices };
