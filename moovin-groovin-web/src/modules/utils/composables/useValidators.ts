import { computed, ref, unref, Ref, ComputedRef, watch } from '@vue/composition-api';
import reduce from 'lodash/reduce';
import mapValues from 'lodash/mapValues';
import isNil from 'lodash/isNil';
import fromPairs from 'lodash/fromPairs';

import type { OptionalPromise } from '@moovin-groovin/shared/src/types/optionals';
import type OptionalRef from '@/modules/utils-reactivity/types/OptionalRef';

/* eslint-disable-next-line @typescript-eslint/ban-types */
interface UseValidators<T extends object> {
  /** Whether the data has passed all validators */
  isValid: ComputedRef<Readonly<boolean>>;
  /** Data validation errors per prop */
  errors: ComputedRef<Readonly<Partial<{ [K in keyof T]: (string | false)[] }>>>;
  /** Whether data is valid per prop */
  valids: ComputedRef<Readonly<Partial<{ [K in keyof T]: boolean }>>>;
  /** Trigger validation */
  validate: () => Promise<void>;
}

type Validator<T = any> = (value: T) => OptionalPromise<boolean | undefined | null | string>;

/* eslint-disable-next-line @typescript-eslint/ban-types */
const useValidators = <T extends object>(
  data: OptionalRef<T>,
  validators: OptionalRef<Partial<{ [K in keyof T]: Validator<T[K]> | Validator<T[K]>[] }>>
): UseValidators<T> => {
  const dataRef = ref(data ?? {}) as Ref<T>;
  const validatorsRef = ref(validators ?? {}) as Ref<
    Partial<{ [K in keyof T]: Validator<T[K]> | Validator<T[K]>[] }>
  >;

  const normalizedValidators = computed(
    (): Partial<{ [K in keyof T]: Validator<T[K]>[] }> => {
      const currValidators = unref(validatorsRef) || {};
      const normValidators = mapValues(unref(dataRef), (_, key: keyof T) => {
        const propValidators = currValidators[key] || [];
        const normPropValidators = Array.isArray(propValidators)
          ? propValidators
          : [propValidators];
        return normPropValidators;
      });
      return normValidators as any;
    }
  );

  const errors: Ref<Partial<{ [K in keyof T]: (string | false)[] }>> = ref({});

  // To enable the use of async validators, we assign errors via watch
  // instead of computed
  const validate = async () => {
    const dataErrorEntries = await Promise.all(
      Object.entries(unref(dataRef) || {}).map(
        async ([key, value]): Promise<[string, (string | false)[]]> => {
          const propValidators = unref(normalizedValidators)[key as keyof T] as Validator[];
          const validatedProps = await Promise.all(
            propValidators.map((validator) => validator(value))
          );
          // Filter out successful validations
          const propErrors = validatedProps.filter((result) => !isNil(result) && result !== true);
          return [key, propErrors] as [string, (string | false)[]];
        }
      )
    );
    errors.value = fromPairs(dataErrorEntries) as any;
  };

  // To enable the use of async validators, we assign errors via watch
  // instead of computed
  watch(normalizedValidators, validate);

  const valids = computed(
    (): Partial<{ [K in keyof T]: boolean }> => {
      const currErrors = unref(errors);
      const validsByProp = mapValues(currErrors, (value) => !value?.length);
      return validsByProp;
    }
  );

  const isValid = computed((): boolean =>
    reduce(
      Object.values(unref(valids) ?? {}) as boolean[],
      (valid, propIsValid) => valid && propIsValid,
      true as boolean
    )
  );

  return {
    isValid,
    errors,
    valids,
    validate,
  };
};

export default useValidators;
