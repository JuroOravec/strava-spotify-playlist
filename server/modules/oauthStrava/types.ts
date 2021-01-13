import type { RefreshTokenResponse } from 'strava-v3';

import type { SummaryAthlete } from '../strava/types/models';

export type TokenDataResponse = RefreshTokenResponse & {
  athlete?: SummaryAthlete;
};

export enum PermissionScope {
  PROFILE_READ_PUBLIC = 'read',
  ACTIVITY_READ_PUBLIC = 'activity:read',
  ACTIVITY_READ_PRIVATE = 'activity:read_all',
  ACTIVITY_WRITE = 'activity:write',
}
