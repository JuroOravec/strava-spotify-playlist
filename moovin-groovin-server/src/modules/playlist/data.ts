import type { TemplateFormatter } from '@moovin-groovin/shared';
import PlaylistProviderApi from './lib/PlaylistProviderApi';

import type { PlaylistProviderInput, PlaylistProviderInputFn } from './types';

interface PlaylistExternalOptions {
  appNamePublic: string;
  playlistProviders: PlaylistProviderInput | PlaylistProviderInputFn<any>;
}

interface PlaylistInternalOptions {
  templateFormater: TemplateFormatter | null;
  playlistProviderApi: PlaylistProviderApi | null;
}

type PlaylistData = PlaylistInternalOptions & PlaylistExternalOptions;

export { PlaylistData, PlaylistExternalOptions };
