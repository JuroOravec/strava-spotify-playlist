export interface PhotosSummary_primary {
  id: number | null;
  /** E.g. `'f3d72a40-e456-4959-a83d-944ba6979a03'` */
  unique_id: string | null;
  /** UNKNOWN */
  urls: any; // TODO
  /** E.g. `1` */
  source: number;
}

/**
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference/#api-models-PhotosSummary
 */
export default interface PhotosSummary {
  primary: PhotosSummary_primary;
  use_primary_photo: boolean;
  /** E.g. `1` */
  count: number;
}
