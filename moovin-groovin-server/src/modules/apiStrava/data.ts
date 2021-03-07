import type { AuthenticationConfig } from 'strava-v3';

type ApiStravaExternalData = Partial<AuthenticationConfig>;

type ApiStravaData = ApiStravaExternalData;

export { ApiStravaData, ApiStravaExternalData };
