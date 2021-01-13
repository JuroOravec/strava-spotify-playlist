/**
 * Last updated: 2020-12-26
 * Taken from: https://developers.strava.com/docs/reference/#api-models-SummaryAthlete
 */
export default interface SummaryAthlete {
  /** The unique identifier of the athlete */
  id: number;
  /** The string unique identifier of the athlete chosen by athlete */
  username: number;
  /** Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail" */
  resource_state: number;
  /** The athlete's first name. */
  firstname?: string;
  /** The athlete's last name. */
  lastname?: string;
  /** URL to a 62x62 pixel profile picture. */
  profile_medium?: string;
  /** URL to a 124x124 pixel profile picture. */
  profile?: string;
  /** The athlete's city. */
  city?: string;
  /** The athlete's state or geographical region. */
  state?: string;
  /** The athlete's country. */
  country?: string;
  /** The athlete's sex. May take one of the following values: M, F */
  sex?: string;
  badge_type_id?: number;
  friend?: any;
  follower?: any;
  /** Whether the athlete has any Summit subscription. */
  summit: boolean;
  /** The time at which the athlete was created. */
  created_at: string;
  /** The time at which the athlete was updated the last time. */
  updated_at: string;
}
