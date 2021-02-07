import { computed, ref, unref, Ref, watch, ComputedRef } from '@vue/composition-api';
import defaults from 'lodash/defaults';
import pickBy from 'lodash/pickBy';
import reduce from 'lodash/reduce';
import isEqual from 'lodash/isEqual';

import type OptionalRef from '../types/OptionalRef';

/* eslint-disable-next-line @typescript-eslint/ban-types */
interface UseFormData<T extends object> {
  /** Form Data */
  formData: Ref<Partial<T>>;
  updateFormData: (updates: Partial<T>) => void;
  resetFormData: (keysToReset?: (keyof T)[]) => void;
  /** Defaults that we can revert the form data to. Used for resetting form state. */
  hasChanges: ComputedRef<boolean>;
  /**
   * Whether there are changes to form data that have not yet been "signed off".
   * Used for triggering confirmation dialogs.
   */
  hasUnconfirmedChanges: Ref<boolean>;
}

/* eslint-disable-next-line @typescript-eslint/ban-types */
const useFormData = <T extends object>(
  options: {
    /** Defaults that we can revert the form data to. Used for resetting form state. */
    defaults?: OptionalRef<Partial<T> | null>;
  } = {}
): UseFormData<T> => {
  const { defaults: dataDefaults } = options;

  const formData: Ref<Partial<T>> = ref({});
  const defaultsRef = ref(dataDefaults) as Ref<Partial<T> | undefined>;
  const hasUnconfirmedChanges = ref(false);

  const hasChanges = computed((): boolean => !isEqual(unref(defaultsRef) ?? {}, unref(formData)));

  watch(
    hasChanges,
    (newHasChanges) => {
      hasUnconfirmedChanges.value = newHasChanges && !unref(hasUnconfirmedChanges);
    },
    { immediate: true }
  );

  watch(
    defaultsRef,
    (newDefaults, oldDefaults) => {
      // Drop keys that came from old defaults
      if (oldDefaults) {
        formData.value = pickBy<Partial<T>>(
          unref(formData),
          (val, key) => (oldDefaults as any)[key] !== val
        );
      }
      // Apply new defaults to keys that are not set yet
      if (newDefaults) {
        formData.value = defaults({}, unref(formData), newDefaults ?? {});
      }
    },
    { immediate: true }
  );

  const updateFormData = (updates: Partial<T>): void => {
    formData.value = { ...unref(formData), ...updates };
  };

  const resetFormData = (keysToReset?: (keyof T)[]): void => {
    const formKeys = keysToReset ?? (Object.keys(unref(formData)) as (keyof T)[]);

    const overrides = reduce(
      formKeys,
      (agg, key) => {
        agg[key] = unref(defaultsRef)?.[key] ?? undefined;
        return agg;
      },
      {} as Partial<T>
    );

    formData.value = { ...unref(formData), ...overrides };
  };

  return {
    formData,
    hasChanges,
    hasUnconfirmedChanges,
    updateFormData,
    resetFormData,
  };
};

export default useFormData;
