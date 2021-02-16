import { computed, ComputedRef, UnwrapRef } from '@vue/composition-api';

import useRefMutable, { UseRefMutable, UseRefMutableOptions } from './useRefMutable';

type RefReadonly<T> = ComputedRef<UnwrapRef<T>>;

interface UseRefReadonly<T = any> extends UseRefMutable<T> {
  readonly: RefReadonly<T>;
}

type UseRefReadonlyOptions<T = any> = UseRefMutableOptions<T>;

const useRefReadonly = <T>(options: UseRefReadonlyOptions<T> = {}): UseRefReadonly<T> => {
  const { ref: valueRef } = useRefMutable(options);

  const readonly = computed(() => valueRef.value);

  return {
    ref: valueRef,
    readonly,
  };
};

export default useRefReadonly;
export type { UseRefReadonlyOptions, UseRefReadonly, RefReadonly };
