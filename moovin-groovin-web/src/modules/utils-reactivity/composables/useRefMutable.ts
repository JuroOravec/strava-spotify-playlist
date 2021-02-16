import { isRef, ref, Ref, UnwrapRef } from '@vue/composition-api';

import type OptionalRef from '../types/OptionalRef';
import useRefCopy from './useRefCopy';

interface UseRefMutable<T = any> {
  ref: Ref<UnwrapRef<T>>;
}

interface UseRefMutableOptions<T = any> {
  value?: OptionalRef<UnwrapRef<T>>;
  copyRef?: boolean;
}

const useRefMutable = <T>(options: UseRefMutableOptions<T> = {}): UseRefMutable<T> => {
  const { value, copyRef = true } = options;

  const mutableRef = (isRef(value)
    ? copyRef
      ? useRefCopy({ value }).ref
      : value
    : ref(value)) as Ref<UnwrapRef<T>>;

  return {
    ref: mutableRef,
  };
};

export default useRefMutable;
export type { UseRefMutableOptions, UseRefMutable };
