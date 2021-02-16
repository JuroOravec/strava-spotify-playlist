import type { OptionalPromise } from "../../types/optionals";

export interface TemplateFormatter {
  name: string;
  install: () => OptionalPromise<void>;
  close: () => OptionalPromise<void>;
  format: (
    template: string,
    context: object
  ) => OptionalPromise<string>;
}
