import type { Ref } from '@vue/composition-api';

const makeSetter = <T>(ref: Ref<T>): ((newValue: T) => void) => {
  const setter = (newValue: T): void => {
    ref.value = newValue;
  };

  return setter;
};

export default makeSetter;
