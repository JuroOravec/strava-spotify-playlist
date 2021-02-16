import useRefSetter, { UseRefSetter, UseRefSetterOptions } from './useRefSetter';
import useRefWatcher, { UseRefWatcher, UseRefWatcherOptions } from './useRefWatcher';
import useRefReadonly, { UseRefReadonly, UseRefReadonlyOptions } from './useRefReadonly';
import useRefMutable from './useRefMutable';

export type { RefSetter } from './useRefSetter';
export type { RefWatcher } from './useRefWatcher';
export type { RefReadonly } from './useRefReadonly';

interface UseRefRich<T = any> extends UseRefSetter<T>, UseRefWatcher<T>, UseRefReadonly<T> {}

const useRefRich = <T>(
  options: UseRefSetterOptions<T> & UseRefWatcherOptions<T> & UseRefReadonlyOptions<T> = {}
): UseRefRich<T> => {
  const { ref: valueRef } = useRefMutable(options);

  return {
    ...useRefSetter({ ...options, value: valueRef, copyRef: false }),
    ...useRefWatcher({ ...options, value: valueRef, copyRef: false }),
    ...useRefReadonly({ ...options, value: valueRef, copyRef: false }),
  };
};

export default useRefRich;
