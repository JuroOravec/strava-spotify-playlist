import type { UnwrapRef } from '@vue/composition-api';

import useRefMutable, { UseRefMutable, UseRefMutableOptions } from './useRefMutable';

type RefSetter<T> = (newValue: UnwrapRef<T>) => void;

interface UseRefSetter<T = any> extends UseRefMutable<T> {
  setter: RefSetter<T>;
}

type UseRefSetterOptions<T = any> = UseRefMutableOptions<T>;

const useRefSetter = <T>(options: UseRefSetterOptions<T> = {}): UseRefSetter<T> => {
  const { ref: valueRef } = useRefMutable(options);

  const setter = (newValue: UnwrapRef<T>): void => {
    valueRef.value = newValue;
  };

  return {
    ref: valueRef,
    setter,
  };
};

export default useRefSetter;
export type { UseRefSetterOptions, UseRefSetter, RefSetter };
