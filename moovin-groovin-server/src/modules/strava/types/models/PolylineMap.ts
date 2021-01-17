import type ResourceState from './ResourceState';

/**
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference/#api-models-PolylineMap
 */
export default interface PolylineMap {
  resource_state: ResourceState;
  /** E.g. `'a3686857104'` */
  id: string;
  /** The polyline of the map, only returned on detailed representation of an object */
  polyline?: string;
  /** The summary polyline of the map */
  summary_polyline: string;
}
