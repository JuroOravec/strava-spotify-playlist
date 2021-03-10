import isNil from 'lodash/isNil';
import truncate from 'lodash/truncate';
import groupBy from 'lodash/groupBy';

import { asyncSafeInvoke } from '@moovin-groovin/shared';
import {
  ServerModule,
  Handlers,
  Services,
  assertContext,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import unixTimestamp from '../../utils/unixTimestamp';
import { ActivityProvider, PlaylistProvider } from '../../types';
import type {
  UserActivityPlaylistInput,
  UserActivityPlaylistMeta,
} from '../storePlaylist/types';
import type { UserTokenModel } from '../storeToken/types';
import type { UserConfig } from '../storeConfig/types';
import { getScopesInfo } from '../oauthStrava/utils/scope';
import {
  createActivityTemplateContext,
  createPlaylistTemplateContext,
} from './utils/templateContext';
import type {
  ActivityInput,
  EnrichedTrack,
  EnrichedPlaylist,
  PlaylistResponse,
  PlaylistDeps,
} from './types';
import type { PlaylistData } from './data';

interface UpdateActivityWithPlaylistOptions {
  activityToken: UserTokenModel;
  activity: ActivityInput;
  playlist: {
    title: string;
    url: string;
    tracks: EnrichedTrack[];
  };
  userConfig: UserConfig;
}
interface CreateActivityPlaylistOptions {
  playlistToken: UserTokenModel;
  activity: ActivityInput;
  playlist: {
    tracks: EnrichedTrack[];
    descriptionLimit?: number;
    titleLimit?: number;
  };
  userConfig: UserConfig;
}

interface CreatePlaylistForActivityOptions {
  activityProviderId: string;
  activityUserId: string;
  activity: ActivityInput;
  playlist: {
    descriptionLimit?: number;
    titleLimit?: number;
  };
}

type DeletePlaylistsByActivityOptions = {
  activityProviderId: string;
  activityUserId: string;
  activityId: ActivityInput['activityId'];
};

type PlaylistServices = {
  updateActivityWithPlaylist: (
    input: UpdateActivityWithPlaylistOptions
  ) => Promise<void>;
  createActivityPlaylist: (
    input: CreateActivityPlaylistOptions
  ) => Promise<EnrichedPlaylist>;
  createPlaylistsFromActivity: (
    options: CreatePlaylistForActivityOptions
  ) => Promise<EnrichedPlaylist[]>;
  deletePlaylistsByActivity: (
    options: DeletePlaylistsByActivityOptions
  ) => Promise<UserActivityPlaylistMeta | null>;
} & Services;

type ThisModule = ServerModule<
  PlaylistServices,
  Handlers,
  PlaylistData,
  PlaylistDeps
>;

const createPlaylistServices = (): PlaylistServices => {
  async function getTracksForActivity(
    this: ThisModule,
    input: {
      activity: ActivityInput;
      playlistTokens: UserTokenModel[];
    }
  ): Promise<
    {
      providerId: string;
      tracks: EnrichedTrack[];
      token: UserTokenModel | undefined;
    }[]
  > {
    assertContext(this.context);
    const { activity, playlistTokens } = input;
    const { startTime, endTime } = activity;
    const { getPlayedTracks } = this.context.modules.trackHistory.services;
    const { playlistProviderApi } = this.data;

    const tracks = await getPlayedTracks({
      providers: playlistTokens,
      after: startTime,
      before: endTime,
      inclusive: true,
    }).catch((e: Error) => {
      logger.error(e);
      return [];
    });

    if (!tracks.length) return [];

    const tracksByProviderEntries = Object.entries(
      groupBy(tracks, (t) => t.playlistProviderId)
    ).map(([providerId, providerTracks]) => ({
      providerId,
      tracks: providerTracks,
      token: playlistTokens.find((t) => t.providerId === providerId),
    }));

    const enrichedTracksEntries = await Promise.all(
      tracksByProviderEntries.map(async ({ providerId, tracks, token }) => ({
        providerId,
        token,
        tracks: token
          ? (await playlistProviderApi?.enrichTracks({
              providerId,
              providerUserId: token?.providerUserId,
              tracks,
            })) ?? []
          : [],
      }))
    );

    return enrichedTracksEntries;
  }

  async function createActivityPlaylist(
    this: ThisModule,
    input: CreateActivityPlaylistOptions
  ): Promise<EnrichedPlaylist> {
    const {
      activity,
      playlist: playlistInput,
      playlistToken,
      userConfig,
    } = input;
    const {
      tracks,
      descriptionLimit: playlistDescLimit,
      titleLimit: playlistTitleLimit,
    } = playlistInput;
    const {
      internalUserId,
      providerId: playlistProviderId,
      providerUserId: playlistUserId,
    } = playlistToken;
    const { activityProviderId, activityId, title: activityTitle } = activity;
    const {
      playlistCollaborative,
      playlistPublic,
      playlistTitleTemplate,
      playlistDescriptionTemplate,
    } = userConfig;

    logger.info({
      msg: 'Creating activity playlist',
      playlistUserId,
      activityProviderId,
      activityId,
      tracksCount: tracks.length,
    });

    assertContext(this.context);
    const {
      getUserPlaylistByUserAndActivity,
      insertUserPlaylist,
    } = this.context.modules.storePlaylist.services;
    const {
      upsertTracks,
      upsertPlaylistTracks,
    } = this.context.modules.storeTrack.services;
    const { playlistProviderApi } = this.data;

    // There should never be oldPlaylist found, because that implies that
    // either Strava sent a webhook event more than once, or we've inserted
    // a wrong entry before, or someone is triggering the endpoint manually.
    // But for the sake of being able to re-run this logic in case something
    // fails, we throw only if we found oldPlaylist and it has finished
    // creating (has tracksAssigned).
    const oldPlaylist = await getUserPlaylistByUserAndActivity({
      internalUserId,
      activityProviderId,
      activityId,
    });

    if (oldPlaylist && oldPlaylist.tracksAssigned) {
      throw Error(
        `Playlist already exists for user activity (${playlistProviderId} userID: ${playlistUserId}, ${activityProviderId} activityID: ${activityId}).`
      );
    }

    ///////////////////////////////////////
    // Generate playlist title and desc
    ///////////////////////////////////////

    const { proxiedContext: templateContext } = createPlaylistTemplateContext({
      activity,
      playlist: { tracks },
      meta: { app: this.data.appNamePublic },
    });

    if (!this.data.templateFormater) {
      logger.warn('Failed to find template formatter.');
    }

    logger.debug('Generating playlist name.');

    const {
      result: playlistName,
      error: playlistNameError,
    } = await asyncSafeInvoke(() => {
      if (this.data.templateFormater && !isNil(playlistTitleTemplate)) {
        return this.data.templateFormater?.format(
          playlistTitleTemplate,
          templateContext,
          { textLimit: playlistTitleLimit }
        );
      }
      return truncate(`[${activityProviderId}] "${activity.title}"`, {
        length: playlistTitleLimit ?? 100,
      });
    });

    if (playlistNameError || isNil(playlistName)) {
      throw Error(
        `Failed to generate playlist name: ${playlistNameError?.message}`
      );
    } else {
      logger.debug('Done generating playlist name.');
    }

    logger.debug('Generating playlist description.');

    const {
      result: playlistDescription,
      error: playlistDescriptionError,
    } = await asyncSafeInvoke(() => {
      if (this.data.templateFormater && !isNil(playlistDescriptionTemplate)) {
        return this.data.templateFormater.format(
          playlistDescriptionTemplate,
          templateContext,
          { textLimit: playlistDescLimit }
        );
      }
      return truncate(
        `Playlist for ${activityProviderId} activity "${activity.title}"`,
        { length: playlistDescLimit ?? 300 }
      );
    });

    if (playlistDescriptionError || isNil(playlistDescription)) {
      logger.error(
        `Failed to generate playlist description: ${playlistDescriptionError?.message}`
      );
    } else {
      logger.debug('Done generating playlist description.');
    }

    ////////////////////////
    // Create playlist
    ////////////////////////

    let playlist: UserActivityPlaylistMeta | null = oldPlaylist;
    let playlistData: PlaylistResponse | null = null;

    if (!playlist) {
      const createPlaylistInput = {
        providerId: playlistProviderId,
        providerUserId: playlistUserId,
        playlist: {
          name: playlistName,
          description: playlistDescription ?? undefined,
          collaborative: playlistCollaborative,
          public: playlistPublic,
        },
      };

      playlistData =
        (await playlistProviderApi?.createPlaylist(createPlaylistInput)) ??
        null;

      if (!playlistData) {
        logger.error({
          msg: 'Failed to create playlist',
          ...createPlaylistInput,
        });
        throw Error('Failed to create playlist');
      }

      const insertPlaylistInput: UserActivityPlaylistInput = {
        internalUserId,
        activityProviderId,
        activityId,
        playlistProviderId,
        playlistId: playlistData.playlistId,
        playlistName: playlistData.title,
        playlistUrl: playlistData.url,
        tracksAssigned: false,
        activityName: activityTitle,
        dateCreated: unixTimestamp(),
      };

      playlist = await insertUserPlaylist(insertPlaylistInput);
    } else {
      playlistData =
        (await playlistProviderApi?.getPlaylist({
          providerId: playlistProviderId,
          providerUserId: playlistUserId,
          playlistId: playlist.playlistId,
        })) ?? null;
    }

    if (!playlistData) {
      logger.warn('Failed to load playlist data');
    }

    if (!playlist) {
      throw Error(
        `Failed to create a playlist for user activity (${playlistProviderId} userID: ${playlistUserId}, ${activityProviderId} activityID: ${activityId}).`
      );
    }

    const { playlistId } = playlist;

    ////////////////////////
    // Save tracks data
    ////////////////////////

    await upsertTracks(tracks);
    await upsertPlaylistTracks(
      tracks.map((track) => ({ ...track, playlistId }))
    );

    return {
      ...(playlistData ?? {}),
      ...playlist,
      tracks,
    };
  }

  /** Main flow that creates playlists based on tracks that were listened to during and activity */
  async function createPlaylistsFromActivity(
    this: ThisModule,
    options: CreatePlaylistForActivityOptions
  ): Promise<EnrichedPlaylist[]> {
    // TODO: Save the current activity in DB if this throw, so we can fetch
    // the activities when the user associates their playlist account with activity account?

    assertContext(this.context);
    const { modules } = this.context;
    const { resolveTokens } = this.context.modules.storeToken.services;
    const { getUser } = this.context.modules.storeUser.services;
    const {
      getUserConfigWithDefaults,
    } = this.context.modules.storeConfig.services;
    const {
      updateUserPlaylistTracksAssigned,
    } = this.context.modules.storePlaylist.services;
    const { playlistProviderApi } = this.data;

    const {
      activityProviderId,
      activityUserId,
      activity,
      playlist: playlistOptions,
    } = options;

    logger.debug({
      msg: 'Setting up playlists for activity',
      activityUserId,
      activityId: activity.activityId,
      activityType: activity.activityType,
      activityStartTime: activity.startTime,
      activityEndTime: activity.endTime,
      descriptionLimit: activity.descriptionLimit,
    });

    const providers = [
      activityProviderId,
      ...Object.values(PlaylistProvider),
    ] as [ActivityProvider, ...PlaylistProvider[]];

    const [activityToken, ...playlistTokens] = await resolveTokens({
      startProviderId: activityProviderId,
      startProviderUserId: activityUserId,
      targetProviderIds: providers,
    }).then((tokensByProviders) =>
      providers.map((providerId) => tokensByProviders[providerId])
    );

    const user = activityToken
      ? await getUser(activityToken.internalUserId)
      : null;

    if (!user || !activityToken) {
      throw Error(
        `No user exists for ${activityProviderId} activity user id (${activityProviderId} ID: "${activityUserId}"`
      );
    }

    const tracksByProviders = await getTracksForActivity.call(this, {
      modules,
      activity,
      playlistTokens: playlistTokens.filter(Boolean) as UserTokenModel[],
    });

    const userConfig = await getUserConfigWithDefaults(user.internalUserId);
    const playlists = await Promise.all(
      tracksByProviders.map(async ({ providerId, token, tracks }) => {
        const { result, error } = await asyncSafeInvoke(async () => {
          if (!token) {
            logger.warn(
              `Skipping creating playlist for "${providerId}". Did not match token`
            );
            return null;
          }
          if (!tracks?.length) {
            logger.info(
              `Skipping creating playlist for "${providerId}". No tracks`
            );
            return null;
          }
          logger.debug(
            `Creating "${providerId}" playlist with ${tracks.length} tracks`
          );

          const playlist = await this.services.createActivityPlaylist({
            playlistToken: token,
            activity,
            userConfig,
            playlist: {
              ...playlistOptions,
              tracks,
            },
          });

          const { playlistId } = playlist;

          const { error: addTracksError } = await asyncSafeInvoke(
            () =>
              playlistProviderApi?.addTracksToPlaylist({
                providerId,
                providerUserId: token.providerUserId,
                playlistId,
                tracks,
              }) ?? null
          );

          if (!addTracksError) {
            await updateUserPlaylistTracksAssigned({
              playlistProviderId: providerId,
              playlistId,
              tracksAssigned: true,
            });
          } else {
            logger.error(addTracksError);
          }
          await this.services.updateActivityWithPlaylist({
            activityToken,
            activity,
            userConfig,
            playlist: {
              tracks,
              title: playlist?.title ?? 'UNKNOWN',
              url: playlist?.url ?? 'UNKNOWN',
            },
          });

          logger.debug(
            `Done creating "${providerId}" playlist with ${tracks.length} tracks`
          );

          return playlist;
        });

        if (error) logger.error(error);
        return result ?? null;
      })
    );

    logger.debug(
      `Done creating playlists for activity "${activity.activityId}"`
    );

    return playlists.filter(Boolean) as EnrichedPlaylist[];
  }

  async function updateActivityWithPlaylist(
    this: ThisModule,
    input: UpdateActivityWithPlaylistOptions
  ) {
    assertContext(this.context);
    const { getClientForAthlete } = this.context.modules.apiStrava.services;

    const { activity, playlist, activityToken, userConfig } = input;
    const { providerUserId, scope } = activityToken;
    const { activityId, descriptionLimit: activityDescLimit } = activity;
    const { tracks } = playlist;
    const {
      activityDescriptionEnabled,
      activityDescriptionTemplate,
    } = userConfig;

    // TODO: Move this to activityStrava
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
      playlist: { ...playlist, tracks },
      meta: { app: this.data.appNamePublic },
    });

    // Allow user to opt out of updating activity description
    if (!activityDescriptionEnabled || isNil(activityDescriptionTemplate)) {
      return;
    }

    let activityDescription: string | null = null;
    if (this.data.templateFormater) {
      logger.debug('Generating activity description.');
      const { result, error } = await asyncSafeInvoke(
        () =>
          this.data.templateFormater?.format(
            activityDescriptionTemplate,
            activityTemplateContext,
            { textLimit: activityDescLimit ?? 20000 }
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
      // TODO: Move this to activityStrava
      const stravaClient = await getClientForAthlete(providerUserId);

      logger.debug('Calling strava to update activity description.');
      await stravaClient.activities.update({
        id: activityId,
        description: activityDescription,
      });
      logger.debug('Done calling strava to update activity description.');
    }
    logger.debug('Done updating activity with playlist');
  }

  async function deletePlaylistsByActivity(
    this: ThisModule,
    input: DeletePlaylistsByActivityOptions
  ): Promise<UserActivityPlaylistMeta | null> {
    assertContext(this.context);
    const { getToken } = this.context.modules.storeToken.services;
    const { getUserByToken } = this.context.modules.storeUser.services;
    const {
      deleteUserPlaylistsByUserActivity,
    } = this.context.modules.storePlaylist.services;

    const { activityProviderId, activityUserId, activityId } = input;

    const activityToken = await getToken({
      providerId: activityProviderId,
      providerUserId: activityUserId,
    });

    if (!activityToken) {
      throw Error(
        `No token exists for "${activityProviderId}" user "${activityUserId}"`
      );
    }

    const user = await getUserByToken({
      providerId: activityProviderId,
      providerUserId: activityToken.providerUserId,
    });

    if (!user) {
      throw Error(
        `No user exists for "${activityProviderId}" activity "${activityId}"`
      );
    }

    const { internalUserId } = user;

    const deletedPlaylist = await deleteUserPlaylistsByUserActivity({
      internalUserId,
      activityProviderId,
      activityId,
    });

    return deletedPlaylist;
  }

  return {
    updateActivityWithPlaylist,
    createPlaylistsFromActivity,
    createActivityPlaylist,
    deletePlaylistsByActivity,
  };
};

export default createPlaylistServices;
export type { PlaylistServices };
