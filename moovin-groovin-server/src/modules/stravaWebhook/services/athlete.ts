import { ActivityProvider } from '../../../types';
import {
  ServerModule,
  Handlers,
  Services,
  assertContext,
} from '../../../lib/ServerModule';
import logger from '../../../lib/logger';
import unixTimestamp from '../../../utils/unixTimestamp';
import type { DetailedActivity } from '../../apiStrava/types';
import type { StravaWebhookDeps } from '../types';
import type { StravaWebhookData } from '../data';

interface RegisterAthleteActivityOptions {
  /** Unix timestamp (seconds since epoch) when activity started. Overwrites data taken from activity */
  startTime?: number;
  /** Unix timestamp (seconds since epoch) when activity ended. Overwrites data taken from activity */
  endTime?: number;
}

type StravaWebhookAthleteServices = {
  unregisterAthlete: (stravaUserId: string) => Promise<void>;
  registerAthleteActivity: (
    stravaUserId: string,
    activityId: string,
    options?: RegisterAthleteActivityOptions
  ) => Promise<void>;
  unregisterAthleteActivity: (
    stravaUserId: string,
    activityId: string
  ) => Promise<void>;
} & Services;

type ThisModule = ServerModule<
  StravaWebhookAthleteServices,
  Handlers,
  StravaWebhookData,
  StravaWebhookDeps
>;

const createStravaWebhookAthleteServices = (): StravaWebhookAthleteServices => {
  async function unregisterAthlete(
    this: ThisModule,
    stravaUserId: string
  ): Promise<void> {
    assertContext(this.context);
    const { deleteToken } = this.context.modules.storeToken.services;

    // Remove the user's Strava auth token. Other resources bound to that token
    // are removed too.
    deleteToken({
      providerId: ActivityProvider.STRAVA,
      providerUserId: stravaUserId.toString(),
    }).catch((e: Error) => logger.error(e));
  }

  /** Process new activity and emit it to the app */
  async function registerAthleteActivity(
    this: ThisModule,
    stravaUserId: string,
    activityId: string,
    options: RegisterAthleteActivityOptions = {}
  ): Promise<void> {
    assertContext(this.context);
    const { getClientForAthlete } = this.context.modules.apiStrava.services;
    const {
      createPlaylistsFromActivity,
    } = this.context.modules.playlist.services;

    const {
      startTime: overridenStartTime,
      endTime: overridenEndTime,
    } = options;

    const stravaClient = await getClientForAthlete(stravaUserId);

    const {
      start_date,
      elapsed_time,
      name: title,
      description,
      type: activityType,
      // TODO: Use photo from the activity
      photos,
    }: DetailedActivity = await stravaClient.activities.get({
      id: activityId,
    });

    const startTime = overridenStartTime ?? unixTimestamp(start_date);
    const endTime = overridenEndTime ?? startTime + elapsed_time;

    await createPlaylistsFromActivity({
      activityProviderId: ActivityProvider.STRAVA,
      activityUserId: stravaUserId,
      activity: {
        activityProviderId: ActivityProvider.STRAVA,
        activityId,
        activityType,
        startTime,
        endTime,
        title,
        description,
        // NOTE: It _seems_ Strava doesn't have limit for activity description.
        // Limit of 12k chars should cover a tracklist for an activity of 10 hours.
        descriptionLimit: 12000,
      },
      playlist: {
        descriptionLimit: 300,
        titleLimit: 100,
      },
    }).catch((e: Error) => logger.error(e));
  }

  /** Process new activity and emit it to the app */
  async function unregisterAthleteActivity(
    this: ThisModule,
    stravaUserId: string,
    activityId: string
  ): Promise<void> {
    assertContext(this.context);
    const {
      deletePlaylistsByActivity,
    } = this.context.modules.playlist.services;

    await deletePlaylistsByActivity({
      activityProviderId: ActivityProvider.STRAVA,
      activityUserId: stravaUserId,
      activityId,
    }).catch((e: Error) => logger.error(e));
  }

  return {
    registerAthleteActivity,
    unregisterAthleteActivity,
    unregisterAthlete,
  };
};

export default createStravaWebhookAthleteServices;
export type { StravaWebhookAthleteServices };
