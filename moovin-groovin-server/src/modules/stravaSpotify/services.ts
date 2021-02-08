import isNil from 'lodash/isNil';
import truncate from 'lodash/truncate';

import { asyncSafeInvoke } from '../../../../moovin-groovin-shared/src/utils/safeInvoke';
import {
  ServerModule,
  Handlers,
  Services,
  assertContext,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import type { UserActivityPlaylistMeta } from '../storePlaylist/types';
import type { UserTrackMeta } from '../storeTrack/types';
import type { UserTokenModel } from '../storeToken/types';
import type { UserConfig } from '../storeConfig/types';
import { getScopesInfo } from '../oauthStrava/utils/scope';
import {
  createActivityTemplateContext,
  createPlaylistTemplateContext,
} from './utils/templateContext';
import type {
  ActivityInput,
  StravaSpotifyDeps,
  TrackWithMetadata,
} from './types';
import type { StravaSpotifyData } from './data';

type StravaOrSpotifyUserId =
  | { stravaUserId: string; spotifyUserId?: void }
  | { stravaUserId?: void; spotifyUserId: string };

interface GetTracksForActivityOptions {
  spotifyToken: UserTokenModel;
  activity: ActivityInput;
}
interface UpdateActivityWithPlaylistOptions {
  stravaToken: UserTokenModel;
  activity: ActivityInput;
  playlist: { title: string; url: string };
  tracks: TrackWithMetadata[];
  userConfig: UserConfig;
}
interface CreatePlaylistForActivityOptions {
  spotifyToken: UserTokenModel;
  activity: ActivityInput;
  tracks: TrackWithMetadata[];
  userConfig: UserConfig;
}
interface CreatePlaylistForActivityReturn {
  playlist: UserActivityPlaylistMeta;
  playlistData: { title: string; url: string } | null;
}
type SetupPlaylistForActivityOptions = StravaOrSpotifyUserId & {
  activity: ActivityInput;
};
type SetupPlaylistForActivityReturn = {
  playlist: UserActivityPlaylistMeta;
  tracks: UserTrackMeta[];
};
type DeletePlaylistForActivityOptions = StravaOrSpotifyUserId & {
  activityId: ActivityInput['activityId'];
};

type StravaSpotifyServices = {
  getTracksForActivity: (
    input: GetTracksForActivityOptions
  ) => Promise<TrackWithMetadata[]>;
  updateActivityWithPlaylist: (
    input: UpdateActivityWithPlaylistOptions
  ) => Promise<void>;
  createPlaylistForActivity: (
    input: CreatePlaylistForActivityOptions
  ) => Promise<CreatePlaylistForActivityReturn>;
  setupPlaylistForActivity: (
    options: SetupPlaylistForActivityOptions
  ) => Promise<SetupPlaylistForActivityReturn>;
  deletePlaylistForActivity: (
    options: DeletePlaylistForActivityOptions
  ) => Promise<UserActivityPlaylistMeta | null>;
} & Services;

type ThisModule = ServerModule<
  StravaSpotifyServices,
  Handlers,
  StravaSpotifyData,
  StravaSpotifyDeps
>;

const createStravaSpotifyServices = (): StravaSpotifyServices => {
  async function getTracksForActivity(
    this: ThisModule,
    input: GetTracksForActivityOptions
  ): Promise<TrackWithMetadata[]> {
    const { activity, spotifyToken } = input;
    const { providerUserId: spotifyUserId } = spotifyToken;
    const { startTime, endTime } = activity;

    assertContext(this.context);
    const { getPlayedTracks } = this.context.modules.spotifyHistory.services;
    const tracks = await getPlayedTracks(spotifyUserId, {
      after: startTime,
      before: endTime,
      inclusive: true,
    });

    if (!tracks.length) return [];

    const { batchedGetTracks } = this.context.modules.spotify.services;
    const tracksMetadata = await batchedGetTracks({
      spotifyUserId,
      trackIds: tracks.map((track) => track.spotifyTrackId),
    });

    const tracksWithMetadata = tracks.map((track, i) => ({
      ...track,
      metadata: tracksMetadata[i] || null,
    }));

    return tracksWithMetadata;
  }

  async function createPlaylistForActivity(
    this: ThisModule,
    input: CreatePlaylistForActivityOptions
  ): Promise<CreatePlaylistForActivityReturn> {
    const { activity, tracks, spotifyToken, userConfig } = input;
    const { internalUserId, providerUserId: spotifyUserId } = spotifyToken;
    const { activityId } = activity;
    const {
      playlistCollaborative,
      playlistPublic,
      playlistTitleTemplate,
      playlistDescriptionTemplate,
    } = userConfig;

    assertContext(this.context);
    const {
      getUserPlaylistByUserAndActivity,
      insertUserPlaylist,
    } = this.context.modules.storePlaylist.services;
    // There should never be oldPlaylist found, because that implies that
    // either Strava sent a webhook event more than once, or we've inserted
    // a wrong entry before, or someone is triggering the endpoint manually.
    // But for the sake of being able to re-run this logic in case something
    // fails, we throw only if we found oldPlaylist and it has finished
    // creating (has tracksAssigned).
    const oldPlaylist = await getUserPlaylistByUserAndActivity(
      internalUserId,
      activityId
    );

    if (oldPlaylist && oldPlaylist.tracksAssigned) {
      throw Error(
        `Playlist already exists for user activity (SPOTIFY_USER_ID: ${spotifyUserId}, STRAVA_ACTIVITY_ID: ${activityId}).`
      );
    }

    const { proxiedContext: templateContext } = createPlaylistTemplateContext({
      activity,
      tracks,
      meta: {
        app: this.data.appNamePublic,
      },
    });

    if (!this.data.templateFormater) {
      logger.warn('Failed to find template formatter.');
    }

    logger.debug('Generating playlist name.');
    const {
      result: playlistName,
      error: playlistNameError,
    } = await asyncSafeInvoke(() =>
      this.data.templateFormater && !isNil(playlistTitleTemplate)
        ? this.data.templateFormater?.formatPlaylistTitle(
            playlistTitleTemplate,
            templateContext
          )
        : truncate(`[Strava] "${activity.title}"`, { length: 100 })
    );
    if (playlistNameError || isNil(playlistName)) {
      logger.error(
        `Failed to generate playlist name: ${playlistNameError?.message}`
      );
    } else {
      logger.debug('Done generating playlist name.');
    }

    logger.debug('Generating playlist description.');
    const {
      result: playlistDescription,
      error: playlistDescriptionError,
    } = await asyncSafeInvoke(() =>
      this.data.templateFormater && !isNil(playlistDescriptionTemplate)
        ? this.data.templateFormater.formatPlaylistDescription(
            playlistDescriptionTemplate,
            templateContext
          )
        : truncate(`Playlist for Strava activity "${activity.title}"`, {
            length: 300,
          })
    );
    if (playlistDescriptionError || isNil(playlistDescription)) {
      logger.error(
        `Failed to generate playlist description: ${playlistDescriptionError?.message}`
      );
    } else {
      logger.debug('Done generating playlist description.');
    }

    let playlist: UserActivityPlaylistMeta | null = oldPlaylist;
    let playlistData: { url: string; name: string } | null = null;

    const { withAccessToken } = this.context.modules.spotify.services;
    await withAccessToken(spotifyUserId, async ({ spotifyClient }) => {
      if (!playlist) {
        // NOTE: Unlike what typings suggest, createPlaylist doesn't accept userId as first arg.
        const playlistResponse = await spotifyClient.createPlaylist(
          playlistName as string,
          // @ts-ignore
          {
            description: playlistDescription,
            collaborative: playlistCollaborative,
            public: playlistPublic,
          }
        );

        if (!playlistResponse) {
          throw Error('Failed to create a Spotify playlist');
        }

        playlistData = {
          name: playlistResponse.body.name,
          url: playlistResponse.body.external_urls.spotify,
        };

        playlist = await insertUserPlaylist({
          internalUserId,
          stravaActivityId: activityId,
          spotifyPlaylistId: playlistResponse.body.id,
          spotifyPlaylistUri: playlistResponse.body.uri,
          tracksAssigned: false,
        });
      } else {
        const playlistResponse = await spotifyClient.getPlaylist(
          playlist.spotifyPlaylistId,
          { fields: 'external_urls,name' }
        );
        playlistData = {
          name: playlistResponse.body.name,
          url: playlistResponse.body.external_urls.spotify,
        };
      }
    });

    if (!playlistData) {
      logger.warn('Failed to load playlist data');
    }

    if (!playlist) {
      throw Error(
        `Failed to create a playlist for user activity (SPOTIFY_USER_ID: ${spotifyUserId}, STRAVA_ACTIVITY_ID: ${activityId}).`
      );
    }

    return {
      playlist,
      playlistData,
    };
  }

  async function updateActivityWithPlaylist(
    this: ThisModule,
    input: UpdateActivityWithPlaylistOptions
  ) {
    const { activity, tracks, playlist, stravaToken, userConfig } = input;
    const { providerUserId: stravaUserId, scope } = stravaToken;
    const { activityId } = activity;
    const { activityDescriptionTemplate } = userConfig;

    const { canWriteToActivities } = getScopesInfo(scope || '');
    if (!canWriteToActivities) {
      throw Error(
        'Missing write permission. Cannot update activity description.'
      );
    }

    const {
      proxiedContext: activityTemplateContext,
    } = createActivityTemplateContext({
      activity,
      tracks,
      playlist,
      meta: {
        app: this.data.appNamePublic,
      },
    });

    // Allow user to update the strava activity description with playlist and tracks data
    if (!isNil(activityDescriptionTemplate)) {
      let activityDescription: string | null = null;
      if (this.data.templateFormater) {
        logger.debug('Generating activity description.');
        const { result, error } = await asyncSafeInvoke(
          () =>
            this.data.templateFormater?.formatActivityDescription(
              activityDescriptionTemplate,
              activityTemplateContext
            ) ?? null
        );
        activityDescription = result;
        if (error) {
          logger.error(
            `Failed to generate activity description: ${error.message}`
          );
        } else {
          logger.debug('Done generating activity description.');
        }
      } else {
        logger.warn('Failed to find template formatter.');
      }

      if (!isNil(activityDescription)) {
        assertContext(this.context);
        const { getClientForAthlete } = this.context.modules.strava.services;
        const stravaClient = await getClientForAthlete(stravaUserId);
        await stravaClient.activities.update({
          id: activityId,
          description: activityDescription,
        });
      }
    }
  }

  async function setupPlaylistForActivity(
    this: ThisModule,
    options: SetupPlaylistForActivityOptions
  ): Promise<SetupPlaylistForActivityReturn> {
    // TODO: Save the current activity in DB if this throw, so we can fetch
    // the activities when the user associates their spotify account with strava account?

    const {
      activity,
      spotifyUserId: maybeSpotifyUserId,
      stravaUserId: maybeStravaUserId,
    } = options;

    logger.debug({
      msg: 'Setting up playlist for activity',
      spotifyUserId: maybeSpotifyUserId,
      stravaUserId: maybeStravaUserId,
      activityId: activity.activityId,
      activityType: activity.activityType,
      activityStartTime: activity.startTime,
      activityEndTime: activity.endTime,
    });

    assertContext(this.context);
    const { resolveTokens } = this.context.modules.storeToken.services;
    const [stravaToken, spotifyToken] = await resolveTokens({
      startProviderId: maybeStravaUserId ? 'strava' : 'spotify',
      startProviderUserId: maybeStravaUserId
        ? maybeStravaUserId
        : (maybeSpotifyUserId as string),
      targetProviderIds: ['strava', 'spotify'],
    });

    const { providerUserId: spotifyUserId } = spotifyToken;

    assertContext(this.context);

    const { getUser } = this.context.modules.storeUser.services;
    const user = await getUser(spotifyToken.internalUserId);

    if (!user) {
      throw Error(
        `No user exists for Strava or Spotify user id (STRAVA ID: "${maybeStravaUserId}", SPOTIFY ID: "${maybeSpotifyUserId}"`
      );
    }

    const {
      updateUserPlaylistTracksAssigned,
    } = this.context.modules.storePlaylist.services;

    const tracks = await this.services.getTracksForActivity({
      activity,
      spotifyToken,
    });

    const {
      getUserConfigWithDefaults,
    } = this.context.modules.storeConfig.services;
    const userConfig = await getUserConfigWithDefaults(user.internalUserId);

    const {
      playlist,
      playlistData,
    } = await this.services.createPlaylistForActivity({
      spotifyToken,
      activity,
      userConfig,
      tracks,
    });

    const { spotifyPlaylistId } = playlist;

    const {
      batchedAddTracksToPlaylist,
    } = this.context.modules.spotify.services;
    const { error: addTracksError } = await asyncSafeInvoke(() =>
      batchedAddTracksToPlaylist({
        spotifyUserId,
        spotifyPlaylistId,
        trackUris: tracks.map((track) => track.spotifyTrackUri),
      })
    );
    if (!addTracksError) {
      await updateUserPlaylistTracksAssigned(spotifyPlaylistId, true);
    }

    await asyncSafeInvoke(() =>
      this.services.updateActivityWithPlaylist({
        stravaToken,
        activity,
        userConfig,
        tracks,
        playlist: playlistData ?? { title: 'UNKNOWN', url: 'UNKNOWN' },
      })
    );

    return {
      playlist,
      tracks,
    };
  }

  async function deletePlaylistForActivity(
    this: ThisModule,
    options: DeletePlaylistForActivityOptions
  ): Promise<UserActivityPlaylistMeta | null> {
    assertContext(this.context);
    const {
      activityId: stravaActivityId,
      spotifyUserId: maybeSpotifyUserId,
      stravaUserId: maybeStravaUserId,
    } = options;

    const { resolveTokens } = this.context.modules.storeToken.services;
    const [stravaToken, spotifyToken] = await resolveTokens({
      startProviderId: maybeStravaUserId ? 'strava' : 'spotify',
      startProviderUserId: maybeStravaUserId
        ? maybeStravaUserId
        : (maybeSpotifyUserId as string),
      targetProviderIds: ['strava', 'spotify'],
    });

    const { getUserByToken } = this.context.modules.storeUser.services;
    const user = await getUserByToken({
      providerId: 'spotify',
      providerUserId: spotifyToken.providerUserId,
    });

    if (!user) {
      throw Error('No user exists for given strava os spotify user id');
    }

    const { internalUserId } = user;

    const {
      deleteUserPlaylistByUserActivity,
    } = this.context.modules.storePlaylist.services;

    const deletedPlaylist = await deleteUserPlaylistByUserActivity({
      internalUserId,
      stravaActivityId,
    });

    return deletedPlaylist;
  }

  return {
    getTracksForActivity,
    updateActivityWithPlaylist,
    createPlaylistForActivity,
    setupPlaylistForActivity,
    deletePlaylistForActivity,
  };
};

export default createStravaSpotifyServices;
export type { StravaSpotifyServices };
