/**
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference/#api-models-Split
 */
export default interface Split {
  /** E.g. `1002.9` */
  distance: number;
  /** E.g. `316` */
  elapsed_time: number;
  /** E.g. `2.7` */
  elevation_difference: number;
  /** E.g. `312` */
  moving_time: number;
  /** E.g. `1` */
  split: number;
  /** E.g. `3.21` */
  average_speed: number;
  average_grade_adjusted_speed: number | null;
  /** E.g. `0` */
  pace_zone: number;
}
