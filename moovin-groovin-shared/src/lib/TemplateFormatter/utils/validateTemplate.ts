import { memoize } from "lodash";

import { asyncSafeInvoke } from "../../../utils/safeInvoke";
import HandlebarsTemplateFormatter from "../HandlebarsTemplateFormatter";
import type { TemplateFormatter } from "../types";
import setOnMissingPropStringifierProxy from "./setOnMissingPropStringifierProxy";

const previewContext = {
  activity: {
    title: 'Sunday run',
    description: 'Geese 🦆',
    type: 'run',
    duration: '01:23:45',
    date: 'Sun Jan 17 2021',
    url: 'https://www.strava.com/activities/9999999999',
  },
  playlist: {
    title: 'Playlist for my Sunday run',
    url: 'https://open.spotify.com/playlist/1234567890abcdefghijkl',
    tracklist: `Tracklist:\n00:01:23 Sunday - Easy Life\n00:04:56 Me and My Friends - CRi Remix - CRi, Sophia Bel`,
    tracks: [
      {
        title: 'Sunday',
        album: 'Spaceships Mixtape',
        artist: 'Easy Life',
        duration: '00:03:22',
        startTime: '13:26:45',
      },
      {
        title: 'Me and My Friends - CRi Remix',
        album: 'Me and My Friends: Remixes',
        artist: 'CRi, Sophia Bel',
        duration: '00:05:33',
        startTime: '13:30:08',
      },
    ],
  },
  meta: {
    app: 'MoovinGroovin',
  },
};

const getProxyContext = memoize(setOnMissingPropStringifierProxy, (ctx, missingVal) => JSON.stringify(ctx ?? {}) + `__${missingVal}`)

const validateTemplate = async <TContext extends object>(
  template: string,
  options: {
    context?: TContext;
    formatter?: TemplateFormatter;
  } = {}
) => {
  const { context = previewContext, formatter = new HandlebarsTemplateFormatter() } = options;

  await formatter.install();

  const proxiedContext = getProxyContext(
    context,
    'UNKNOWN'
  );

  const { result, error } = await asyncSafeInvoke(() => formatter.format(template, proxiedContext));

  return {
    result,
    error,
  };
}

export default memoize(validateTemplate, (template, { context, formatter} = {}) =>
  `${formatter?.name}__${JSON.stringify(context ?? {})}__${template}`
);
