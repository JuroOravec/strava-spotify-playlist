import type Handlebars from 'handlebars';
import NodeCache from 'node-cache';

import {
  OptionalPromise,
  TemplateFormatter,
  HandlebarsTemplateFormatter as BaseHandlebarsTemplateFormatter,
} from '@moovin-groovin/shared';

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
}

export default HandlebarsTemplateFormatter;
