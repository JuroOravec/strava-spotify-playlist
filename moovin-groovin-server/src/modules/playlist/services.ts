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
import type { UserTrackModel } from '../storeTrack/types';
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
import resolvePlaylistModuleService from './utils/resolvePlaylistModuleService';

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
  async function enrichTracks(input: {
    modules: PlaylistDeps;
    providerId: string;
    providerUserId: string;
    tracks: UserTrackModel[];
  }): Promise<EnrichedTrack[]> {
    const { providerId, tracks } = input;

    const enrichTracksFn = resolvePlaylistModuleService({
      ...input,
      service: 'enrichTracks',
    });

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

  async function createPlaylist(input: {
    modules: PlaylistDeps;
    providerId: string;
    providerUserId: string;
    playlist: {
      name: string;
      description?: string;
      collaborative?: boolean;
      public?: boolean;
    };
  }): Promise<PlaylistResponse> {
    const {
      modules,
      providerId,
      providerUserId,
      playlist: playlistInput,
    } = input;

    const createPlaylistFn = resolvePlaylistModuleService({
      modules,
      providerId,
      service: 'createPlaylist',
    });

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

  async function getPlaylist(input: {
    modules: PlaylistDeps;
    providerId: string;
    providerUserId: string;
    playlistId: string;
  }): Promise<PlaylistResponse> {
    const { providerId } = input;

    const getPlaylistFn = resolvePlaylistModuleService({
      ...input,
      service: 'getPlaylist',
    });

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

  async function addTracksToPlaylist(input: {
    modules: PlaylistDeps;
    providerId: string;
    providerUserId: string;
    playlistId: string;
    tracks: EnrichedTrack[];
  }): Promise<string[]> {
    const { providerId, playlistId, tracks } = input;

    const addTracksToPlaylistFn = resolvePlaylistModuleService({
      ...input,
      service: 'addTracksToPlaylist',
    });

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

  async function getTracksForActivity(input: {
    modules: PlaylistDeps;
    activity: ActivityInput;
    playlistTokens: UserTokenModel[];
  }): Promise<
    {
      providerId: string;
      tracks: EnrichedTrack[];
      token: UserTokenModel | undefined;
    }[]
  > {
    const { modules, activity, playlistTokens } = input;
    const { startTime, endTime } = activity;
    const { getPlayedTracks } = modules.trackHistory.services;

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
          ? await enrichTracks({
              modules,
              providerId,
              providerUserId: token?.providerUserId,
              tracks,
            })
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

    let playlist: UserActivityPlaylistMeta | null = oldPlaylist;
    let playlistData: PlaylistResponse | null = null;

    if (!playlist) {
      const createPlaylistInput = {
        modules: this.context.modules,
        providerId: playlistProviderId,
        providerUserId: playlistUserId,
        playlist: {
          name: playlistName,
          description: playlistDescription ?? undefined,
          collaborative: playlistCollaborative,
          public: playlistPublic,
        },
      };

      playlistData = await createPlaylist(createPlaylistInput);

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
      playlistData = await getPlaylist({
        modules: this.context.modules,
        providerId: playlistProviderId,
        providerUserId: playlistUserId,
        playlistId: playlist.playlistId,
      });
    }

    if (!playlistData) {
      logger.warn('Failed to load playlist data');
    }

    if (!playlist) {
      throw Error(
        `Failed to create a playlist for user activity (${playlistProviderId} userID: ${playlistUserId}, ${activityProviderId} activityID: ${activityId}).`
      );
    }

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

    const tracksByProviders = await getTracksForActivity({
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

          const { error: addTracksError } = await asyncSafeInvoke(() =>
            addTracksToPlaylist({
              modules,
              providerId,
              providerUserId: token.providerUserId,
              playlistId,
              tracks,
            })
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
