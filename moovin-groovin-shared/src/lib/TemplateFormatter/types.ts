import type { OptionalPromise } from "../../types/optionals";

export interface TemplateFormatter {
  install: () => OptionalPromise<void>;
  close: () => OptionalPromise<void>;
  format: (
    template: string,
    context: object
  ) => OptionalPromise<string>;
}
