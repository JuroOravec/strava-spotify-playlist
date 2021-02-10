import { ref, Ref, UnwrapRef, watch, WatchOptions, WatchStopHandle } from '@vue/composition-api';
import clone from 'lodash/clone';
import isNil from 'lodash/isNil';

import OptionalRef from '../types/OptionalRef';

type WatcherCallback<T = unknown> = (data: T) => void;

interface UseWatcher<T = unknown> {
  trigger: Ref<T>;
  addWatcher: (cb: WatcherCallback<UnwrapRef<T>>) => WatchStopHandle;
}

const useWatcher = <T = unknown>(
  options: {
    value?: OptionalRef<UnwrapRef<T>>;
    watcherOptions?: WatchOptions;
    filter?: (value: UnwrapRef<T>) => unknown;
  } = {}
): UseWatcher<T> => {
  const { value, watcherOptions, filter } = options;
  const trigger = ref(value) as Ref<T>;
  const watcherCallbacks: Set<WatcherCallback<UnwrapRef<T>>> = new Set();

  const addWatcher = (cb: (value: UnwrapRef<T>) => void): WatchStopHandle => {
    watcherCallbacks.add(cb);

    return () => {
      watcherCallbacks.delete(cb);
    };
  };

  watch(
    trigger,
    (triggerValue) => {
      if (!isNil(filter) && !filter(triggerValue as UnwrapRef<T>)) return;
      watcherCallbacks.forEach((cb) => cb(clone(triggerValue as UnwrapRef<T>)));
    },
    watcherOptions
  );

  return {
    trigger,
    addWatcher,
  };
};

export default useWatcher;
export type { WatcherCallback, UseWatcher };
