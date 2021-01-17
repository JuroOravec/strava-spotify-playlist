/**
 * Resource state, indicates level of detail. Possible values:
 * - 1 -> "meta",
 * - 2 -> "summary",
 * - 3 -> "detail"
 *
 * Last updated: 2020-12-27
 * Taken from: https://developers.strava.com/docs/reference
 */
enum ResourceState {
  META = 1,
  SUMMARY = 2,
  DETAILED = 3,
}

export default ResourceState;
