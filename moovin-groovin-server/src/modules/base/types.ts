import type { OptionalArray } from '@moovin-groovin/shared';
import type { AnyServerModules, ModuleContext } from 'src/lib/ServerModule';

export type ViewDirsInput = OptionalArray<string>;

export type ViewDirsInputFn<
  TModules extends AnyServerModules = AnyServerModules
> = (ctx: ModuleContext<TModules>) => ViewDirsInput;
