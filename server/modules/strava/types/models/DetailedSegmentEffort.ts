import type ResourceState from './ResourceState';
import type MetaAthlete from './MetaAthlete';
import type MetaActivity from './MetaActivity';
import type SummarySegment from './SummarySegment';

/**
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference/#api-models-DetailedSegmentEffort
 */
export default interface DetailedSegmentEffort {
  /** E.g. `2712572566408522000` */
  id: number;
  resource_state: ResourceState.SUMMARY; // Note: This is not error, this was returned by the API
  /** E.g. `'Klamydia sprinten'` */
  name: string;
  activity: MetaActivity;
  athlete: MetaAthlete;
  /** E.g. `19` */
  elapsed_time: number;
  /** E.g. `19` */
  moving_time: number;
  /** E.g. `'2020-06-29T05:15:17Z'` */
  start_date: string;
  /** E.g. `'2020-06-29T07:15:17Z'` */
  start_date_local: string;
  /** E.g. `127.82` */
  distance: number;
  /** E.g. `343` */
  start_index: number;
  /** E.g. `357` */
  end_index: number;
  device_watts: boolean;
  average_watts: number;
  /** E.g. `2` */
  pr_rank: number;
  hidden: boolean;
  /** NOTE: Unknown */
  achievements: [];
  segment: SummarySegment;
}
