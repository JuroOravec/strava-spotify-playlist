import type ResourceState from './ResourceState';

/**
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference/#api-models-MetaActivity
 */
export default interface MetaActivity {
  resource_state: ResourceState.META;
  /** E.g. `1234567890` */
  id: number;
}
