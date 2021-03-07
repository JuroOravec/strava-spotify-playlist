import type { TemplateFormatter } from '@moovin-groovin/shared';

interface PlaylistExternalOptions {
  appNamePublic: string;
}

interface PlaylistInternalOptions {
  templateFormater: TemplateFormatter | null;
}

type PlaylistData = PlaylistInternalOptions & PlaylistExternalOptions;

export { PlaylistData, PlaylistExternalOptions };
