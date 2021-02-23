import { computed, ref, unref, Ref, watch, ComputedRef } from '@vue/composition-api';
import defaults from 'lodash/defaults';
import pickBy from 'lodash/pickBy';
import reduce from 'lodash/reduce';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';

import type OptionalRef from '@/modules/utils-reactivity/types/OptionalRef';

interface UseFormData<
  /* eslint-disable @typescript-eslint/ban-types */
  T extends object,
  TSerialized extends object = Partial<Record<keyof T, string>>
  /* eslint-enable */
> {
  /** Form Data */
  formData: Ref<Partial<T>>;
  formDataSerialized: ComputedRef<Partial<TSerialized>>;
  updateFormData: (updates: Partial<T>) => void;
  resetFormData: (keysToReset?: (keyof T)[]) => void;
  /** Object of form data keys that have been modified */
  dirtys: Ref<Partial<Record<keyof T, boolean>>>;
  /** Whether form data has been modified */
  isDirty: Ref<boolean>;
  /** Defaults that we can revert the form data to. Used for resetting form state. */
  hasChanges: ComputedRef<boolean>;
  /**
   * Whether there are changes to form data that have not yet been "signed off".
   * Used for triggering confirmation dialogs.
   */
  hasUnconfirmedChanges: Ref<boolean>;
}

const useFormData = <
  /* eslint-disable @typescript-eslint/ban-types */
  T extends object,
  TSerialized extends object = Record<keyof T, string>
  /* eslint-enable */
>(
  options: {
    /** Defaults that we can revert the form data to. Used for resetting form state. */
    defaults?: OptionalRef<Partial<T> | null>;
    serializer?: (data: Partial<T>) => Partial<TSerialized>;
  } = {}
): UseFormData<T, TSerialized> => {
  const {
    defaults: dataDefaults,
    serializer = (data) => mapValues(data, (val) => val + ''),
  } = options;

  const formData: Ref<Partial<T>> = ref({});
  const defaultsRef = ref(dataDefaults) as Ref<Partial<T> | undefined>;
  const dirtys: Ref<Partial<Record<keyof T, boolean>>> = ref({});
  const hasUnconfirmedChanges = ref(false);

  const hasChanges = computed((): boolean => !isEqual(unref(defaultsRef) ?? {}, unref(formData)));
  const isDirty = computed((): boolean => Boolean(Object.keys(unref(dirtys) || {}).length));
  const formDataSerialized = computed(
    (): Partial<TSerialized> => serializer(unref(formData)) as Partial<TSerialized>
  );

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
    dirtys.value = { ...unref(dirtys), ...mapValues(updates, () => true) };
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
    dirtys.value = {};
  };

  return {
    formData,
    formDataSerialized,
    dirtys,
    isDirty,
    hasChanges,
    hasUnconfirmedChanges,
    updateFormData,
    resetFormData,
  };
};

export default useFormData;
