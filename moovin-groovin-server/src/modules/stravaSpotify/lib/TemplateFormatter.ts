import Handlebars from 'handlebars';
import defaults from 'lodash/defaults';
import NodeCache from 'node-cache';
import truncate from 'lodash/truncate';
import isNil from 'lodash/isNil';

import type { OptionalPromise } from '../../../../../moovin-groovin-shared/src/types/optionals';
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

const defaultCompileOptions: CompileOptions = {
  knownHelpers: {},
  knownHelpersOnly: true,
  noEscape: true,
  strict: true,
  assumeObjects: true,
};

function assertHandlebars(hb: typeof Handlebars | null): asserts hb {
  if (!hb) {
    throw Error('Tried to compile templates before installing the formatter.');
  }
}

class HandlebarsTemplateFormatter implements TemplateFormatter {
  cache: Cache | null = null;
  compileOptions: CompileOptions = {};
  handlebars: typeof Handlebars | null = null;
  installing: Promise<void> | null = null;

  constructor(
    options: { cache?: Cache; compileOptions?: CompileOptions } = {}
  ) {
    const { cache, compileOptions = {} } = options;

    this.cache = cache || createDefaultCache();
    this.compileOptions = defaults({}, compileOptions, defaultCompileOptions);
  }

  async install(): Promise<void> {
    this.installing = new Promise(async (res) => {
      await this.cache?.install();
      this.handlebars = Handlebars.create();
      res();
    });
    return this.installing;
  }

  async close(): Promise<void> {
    if (this.installing) await this.installing;

    this.handlebars?.noConflict?.();
    await this.cache?.close();

    this.installing = null;
  }

  async format(
    template: string,
    context: PlaylistTemplateContext,
    options: { textLimit?: number } = {}
  ): Promise<string> {
    if (this.installing) await this.installing;

    const { textLimit } = options;
    assertHandlebars(this.handlebars);

    const handlebarsTemplate: Handlebars.TemplateDelegate<PlaylistTemplateContext> =
      (await this.cache?.get(template)) ||
      this.handlebars.compile(template, this.compileOptions);

    if (this.cache && !(await this.cache.has(template))) {
      await this.cache.set(template, handlebarsTemplate);
    }

    const text = handlebarsTemplate(context);
    return !isNil(textLimit) ? truncate(text, { length: textLimit }) : text;
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
