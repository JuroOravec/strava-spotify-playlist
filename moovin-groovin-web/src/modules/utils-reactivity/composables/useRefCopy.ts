import { isReadonly, isRef, ref, Ref, UnwrapRef, watch } from '@vue/composition-api';

import type OptionalRef from '../types/OptionalRef';

interface UseRefCopy<T = any> {
  ref: Ref<UnwrapRef<T>>;
}

interface UseRefCopyOptions<T = any> {
  value?: OptionalRef<UnwrapRef<T>>;
}

const useRefCopy = <T>(options: UseRefCopyOptions<T> = {}): UseRefCopy<T> => {
  const { value } = options;

  const valueIsReadonly = isReadonly(value);
  const valueRef = (valueIsReadonly ? ref() : ref(value)) as Ref<UnwrapRef<T>>;

  if (valueIsReadonly && isRef(value)) {
    watch(
      value,
      (newValue: UnwrapRef<T>): void => {
        valueRef.value = newValue;
      },
      { immediate: true }
    );
  }

  return {
    ref: valueRef,
  };
};

export default useRefCopy;
export type { UseRefCopyOptions, UseRefCopy };
