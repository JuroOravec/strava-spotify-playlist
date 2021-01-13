import type { AuthenticationConfig } from 'strava-v3';

type StravaExternalData = Partial<AuthenticationConfig>;

type StravaData = StravaExternalData;

export { StravaData, StravaExternalData };
