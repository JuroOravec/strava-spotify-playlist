import type Handlebars from 'handlebars';
import NodeCache from 'node-cache';

import {
  OptionalPromise,
  HandlebarsTemplateFormatter as BaseHandlebarsTemplateFormatter,
} from '@moovin-groovin/shared';
import logger from '../../../lib/logger';
import type {
  ActivityTemplateContext,
  PlaylistTemplateContext,
  TemplateFormatter,
} from '../types';

type CompileOptions = NonNullable<Parameters<typeof Handlebars.compile>[1]>;

interface Cache {
  get: (
    key: string
  ) => OptionalPromise<Handlebars.TemplateDelegate | undefined>;
  set: (key: string, val: Handlebars.TemplateDelegate) => OptionalPromise<void>;
  has: (key: string) => boolean;
  install: () => OptionalPromise<void>;
  close: () => OptionalPromise<void>;
}

const createDefaultCache = (): Cache => {
  let cache: NodeCache | null;

  return {
    get: (key) => cache?.get(key),
    set: (key, val) => {
      cache?.set(key, val);
    },
    has: (key) => Boolean(cache?.has(key)),
    install: () => {
      cache = new NodeCache({
        stdTTL: 600,
        deleteOnExpire: true,
        useClones: false,
        checkperiod: 60,
      });
    },
    close: () => cache?.flushAll(),
  };
};
class HandlebarsTemplateFormatter
  extends BaseHandlebarsTemplateFormatter
  implements TemplateFormatter {
  constructor(
    options: { cache?: Cache; compileOptions?: CompileOptions } = {}
  ) {
    const { cache = createDefaultCache(), compileOptions = {} } = options;
    super({ cache, compileOptions });
  }

  formatPlaylistTitle(
    template: string,
    context: PlaylistTemplateContext
  ): Promise<string> {
    return this.format(template, context, { textLimit: 100 });
  }

  formatPlaylistDescription(
    template: string,
    context: PlaylistTemplateContext
  ): Promise<string> {
    return this.format(template, context, { textLimit: 300 });
  }

  formatActivityDescription(
    template: string,
    context: ActivityTemplateContext
  ): Promise<string> {
    return this.format(template, context, {
      // NOTE: It _seems_ Strava doesn't have limit for activity description.
      // Limit of 12k chars should cover a tracklist for an activity of 10 hours.
      textLimit: 12000,
    });
  }
}

export default HandlebarsTemplateFormatter;
