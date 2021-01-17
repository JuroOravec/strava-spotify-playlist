import type { TemplateFormatter } from './types';

interface StravaSpotifyExternalOptions {
  appNamePublic: string;
}

interface StravaSpotifyInternalOptions {
  templateFormater: TemplateFormatter | null;
}

type StravaSpotifyData = StravaSpotifyInternalOptions &
  StravaSpotifyExternalOptions;

export { StravaSpotifyData, StravaSpotifyExternalOptions };
