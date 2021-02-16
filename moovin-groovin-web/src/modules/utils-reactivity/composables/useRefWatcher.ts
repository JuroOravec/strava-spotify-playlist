import { UnwrapRef, watch, WatchOptions, WatchStopHandle } from '@vue/composition-api';
import clone from 'lodash/clone';
import isNil from 'lodash/isNil';

import useRefMutable, { UseRefMutable, UseRefMutableOptions } from './useRefMutable';

type WatcherCallback<T = unknown> = (data: T) => void;

type RefWatcher<T> = (cb: WatcherCallback<UnwrapRef<T>>) => WatchStopHandle;

interface UseRefWatcher<T = unknown> extends UseRefMutable<T> {
  addWatcher: RefWatcher<T>;
}

interface UseRefWatcherOptions<T = any> extends UseRefMutableOptions<T> {
  watcherOptions?: WatchOptions;
  filter?: (value: UnwrapRef<T>) => unknown;
}

const useRefWatcher = <T = unknown>(options: UseRefWatcherOptions<T> = {}): UseRefWatcher<T> => {
  const { watcherOptions, filter } = options;
  const { ref: valueRef } = useRefMutable(options);
  const watcherCallbacks: Set<WatcherCallback<UnwrapRef<T>>> = new Set();

  const addWatcher = (cb: (value: UnwrapRef<T>) => void): WatchStopHandle => {
    watcherCallbacks.add(cb);

    return () => {
      watcherCallbacks.delete(cb);
    };
  };

  watch(
    valueRef,
    (triggerValue) => {
      if (!isNil(filter) && !filter(triggerValue as UnwrapRef<T>)) return;
      watcherCallbacks.forEach((cb) => cb(clone(triggerValue as UnwrapRef<T>)));
    },
    watcherOptions
  );

  return {
    ref: valueRef,
    addWatcher,
  };
};

export default useRefWatcher;
export type { WatcherCallback, UseRefWatcher, UseRefWatcherOptions, RefWatcher };
