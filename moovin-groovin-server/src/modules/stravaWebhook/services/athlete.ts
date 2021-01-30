import {
  ServerModule,
  Handlers,
  Services,
  assertContext,
} from '../../../lib/ServerModule';
import logger from '../../../lib/logger';
import unixTimestamp from '../../../utils/unixTimestamp';
import type { DetailedActivity } from '../../strava/types';
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

    // Remove the user's Strava auth token. Other resources bound to that token
    // are removed too.
    this.context.modules.storeToken.services.deleteToken({
      providerId: 'strava',
      providerUserId: stravaUserId.toString(),
    });
  }

  /** Process new activity and emit it to the app */
  async function registerAthleteActivity(
    this: ThisModule,
    stravaUserId: string,
    activityId: string,
    options: RegisterAthleteActivityOptions = {}
  ): Promise<void> {
    assertContext(this.context);

    const {
      startTime: overridenStartTime,
      endTime: overridenEndTime,
    } = options;

    const { getClientForAthlete } = this.context.modules.strava.services;
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

    const {
      setupPlaylistForActivity,
    } = this.context.modules.stravaSpotify.services;
    await setupPlaylistForActivity({
      stravaUserId,
      activity: {
        activityId,
        activityType,
        startTime,
        endTime,
        title,
        description,
      },
    });
  }

  /** Process new activity and emit it to the app */
  async function unregisterAthleteActivity(
    this: ThisModule,
    stravaUserId: string,
    activityId: string
  ): Promise<void> {
    assertContext(this.context);

    const {
      deletePlaylistForActivity,
    } = this.context.modules.stravaSpotify.services;
    await deletePlaylistForActivity({
      stravaUserId,
      activityId,
    });
  }

  return {
    registerAthleteActivity,
    unregisterAthleteActivity,
    unregisterAthlete,
  };
};

export default createStravaWebhookAthleteServices;
export type { StravaWebhookAthleteServices };
