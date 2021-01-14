import type MetaAthlete from './MetaAthlete';
import type MetaActivity from './MetaActivity';
import type ResourceState from './ResourceState';

/**
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference/#api-models-Lap
 */
export default interface Lap {
  resource_state: ResourceState;
  /** E.g. `12165556360` */
  id: number;
  /** E.g. `'Lap 1'` */
  name: string;
  activity: MetaActivity;
  athlete: MetaAthlete;
  /** E.g. `2785` */
  elapsed_time: number;
  /** E.g. `2457` */
  moving_time: number;
  /** E.g. `'2020-06-29T05:05:07Z'` */
  start_date: string;
  /** E.g. `'2020-06-29T07:05:07Z'` */
  start_date_local: string;
  /** E.g. `12220.5` */
  distance: number;
  /** E.g. `0` */
  start_index: number;
  /** E.g. `1666` */
  end_index: number;
  /** E.g. `65.2` */
  total_elevation_gain: number;
  /** E.g. `4.97` */
  average_speed: number;
  /** E.g. `11.5` */
  max_speed: number;
  device_watts: boolean;
  /** E.g. `79.8` */
  average_watts: number;
  /** E.g. `1` */
  lap_index: number;
  /** E.g. `1` */
  split: number;
}
