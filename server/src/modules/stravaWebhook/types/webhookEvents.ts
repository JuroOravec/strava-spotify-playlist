export enum AspectType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum ObjectType {
  ACTIVITY = 'activity',
  ATHLETE = 'athlete',
}

export enum BooleanType {
  TRUE = 'true',
  FALSE = 'false',
}

/**
 * The Strava Webhook Events API supports webhook events for certain changes
 * to athlete and activity objects. Specifically, webhook events are pushed
 * when an athlete revokes access to an application, or when an activity is
 * created, deleted, or one of the following activity fields are updated:
 * "type", "title", "privacy".
 *
 * See https://developers.strava.com/docs/webhooks/
 */
export interface Event {
  /** Athlete's ID */
  owner_id: number;
  /** Model's ID. For activity events, the activity's ID. For athlete events, the athlete's ID. */
  object_id: number;
  /** The push subscription ID that is receiving this event. */
  subscription_id: number;
  /** Event's type */
  aspect_type: AspectType;
  /** The time that the event occurred. */
  event_time: number;
  /** Model the event relates to */
  object_type: ObjectType;
  /**
   * For activity update events, keys can contain "title," "type," and "private,"
   * which is always "true" (activity visibility set to Only You) or "false"
   * (activity visibility set to Followers Only or Everyone). For app deauthorization
   * events, there is always an "authorized" : "false" key-value pair.
   */
  updates: Record<string, any>;
}

export interface AthleteDeauthEvent extends Event {
  object_type: ObjectType.ATHLETE;
  updates: {
    authorized: BooleanType;
  };
}

export interface ActivityEvent extends Event {
  object_type: ObjectType.ACTIVITY;
  updates: Event['updates'] & {
    /** Activity title */
    title?: string;
    /** Activity type */
    type?: string;
    /**
     * Activity visibility
     *
     * `"true"` = set to "Only You"
     *
     * `"false"` = set to "Followers Only or Everyone"
     */
    privacy?: BooleanType;
  };
}
