import type ResourceState from './ResourceState';

/**
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference/#api-models-MetaAthlete
 */
export default interface MetaAthlete {
  resource_state: ResourceState.META;
  /** E.g. `12345678` */
  id: number;
}
