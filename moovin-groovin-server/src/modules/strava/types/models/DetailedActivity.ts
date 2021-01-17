import type DetailedSegmentEffort from './DetailedSegmentEffort';
import type Lap from './Lap';
import type MetaAthlete from './MetaAthlete';
import type PolylineMap from './PolylineMap';
import type ResourceState from './ResourceState';
import type PhotosSummary from './PhotosSummary';
import type Split from './Split';
import type ActivityType from './ActivityType';

/**
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference/#api-models-DetailedActivity
 */
export default interface DetailedActivity {
  resource_state: ResourceState.DETAILED;
  athlete: MetaAthlete;
  /** E.g. `'Abc Title'` */
  name: string;
  /** E.g. `12220.5` */
  distance: number;
  /** E.g. `2457` */
  moving_time: number;
  /** E.g. `2785` */
  elapsed_time: number;
  /** E.g. `64.2` */
  total_elevation_gain: number;
  /** E.g. `'Ride'` */
  type: ActivityType;
  /** E.g. `10` */
  workout_type: number;
  /** E.g. `1234567890` */
  id: number;
  /** E.g. `'12345678-90ab-cdef-0123-4567890abcde-activity.fit'` */
  external_id: string;
  /** E.g. `12345567890` */
  upload_id: number;
  /** E.g. `'2020-06-29T05:05:07Z'` */
  start_date: string;
  /** E.g. `'2020-06-29T07:05:07Z'` */
  start_date_local: string;
  /** E.g. `'(GMT+01:00) Europe/Copenhagen'` */
  timezone: string;
  /** E.g. `7200` */
  utc_offset: number;
  /** E.g. `[55.668852, 12.574907]` */
  start_latlng: [number, number];
  /** E.g. `[55.668852, 12.574907]` */
  end_latlng: [number, number];
  location_city: string | null;
  location_state: string | null;
  location_country: string | null;
  /** E.g. `55.668852` */
  start_latitude: number;
  /** E.g. `12.574907` */
  start_longitude: number;
  /** E.g. `12` */
  achievement_count: number;
  /** E.g. `3` */
  kudos_count: number;
  /** E.g. `0` */
  comment_count: number;
  /** E.g. `1` */
  athlete_count: number;
  /** E.g. `0` */
  photo_count: number;
  map: PolylineMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  from_accepted_tag: boolean;
  upload_id_str: string;
  /** E.g. `4.974` */
  average_speed: number;
  /** E.g. `11.5` */
  max_speed: number;
  /** E.g. `79.8` */
  average_watts: number;
  /** E.g. `196.1` */
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  /** E.g. `47.6` */
  elev_high: number;
  /** E.g. `2.8` */
  elev_low: number;
  /** E.g. `7` */
  pr_count: number;
  /** E.g. `1` */
  total_photo_count: number;
  has_kudoed: boolean;
  /** E.g. `'Abc description'` */
  description: string;
  /** E.g. `218.6` */
  calories: number;
  /** E.g. `3` */
  perceived_exertion: number;
  prefer_perceived_exertion: boolean;
  /** E.g. `'Strava Android App'` */
  device_name: string;
  /** E.g. `'1a5e37aeea779dac5f858aff716b39d28a6f8bc2'` */
  embed_token: string;
  available_zones: [];
  /** E.g. `'everyone'` */
  visibility: string;
  /** NOTE: Unknown */
  gear_id: string | null;
  segment_efforts: DetailedSegmentEffort[];
  splits_metric: Split[];
  splits_standard: Split[];
  laps: Lap[];
  photos: PhotosSummary;
}
