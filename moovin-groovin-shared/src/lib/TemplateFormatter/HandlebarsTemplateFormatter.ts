import Handlebars from 'handlebars';
import defaults from 'lodash/defaults';
import truncate from 'lodash/truncate';
import isNil from 'lodash/isNil';

import type { OptionalPromise } from '../../types/optionals';
import type { TemplateFormatter } from './types';

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
  name = 'HandlebarsTemplateFormatter';
  cache: Cache | null = null;
  compileOptions: CompileOptions = {};
  handlebars: typeof Handlebars | null = null;
  installing: Promise<void> | null = null;

  constructor(
    options: { cache?: Cache; compileOptions?: CompileOptions } = {}
  ) {
    const { cache = null, compileOptions = {} } = options;

    this.cache = cache;
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

  async format<TContext extends object>(
    template: string,
    context: TContext,
    options: { textLimit?: number } = {}
  ): Promise<string> {
    if (this.installing) await this.installing;

    const { textLimit } = options;
    assertHandlebars(this.handlebars);

    const handlebarsTemplate: Handlebars.TemplateDelegate<TContext> =
      (await this.cache?.get(template)) ||
      this.handlebars.compile(template, this.compileOptions);

    if (this.cache && !(await this.cache.has(template))) {
      await this.cache.set(template, handlebarsTemplate);
    }

    const text = handlebarsTemplate(context);
    return !isNil(textLimit) ? truncate(text, { length: textLimit }) : text;
  }
}

export default HandlebarsTemplateFormatter;
