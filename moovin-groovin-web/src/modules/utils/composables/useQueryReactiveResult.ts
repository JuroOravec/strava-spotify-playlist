import type { UseQueryReturn } from '@vue/apollo-composable';
import { ref } from '@vue/composition-api';

/** Wraps useQuery to override result be set from onResult and unset on onError */
const useQueryReactiveResult = <T extends (...args: any[]) => UseQueryReturn<any, any>>(query: T): T => {
  const queryWrapper = (...args: Parameters<T>): ReturnType<T> => {
    const composableReturn = query(...args) as ReturnType<T>;

    const result = ref(composableReturn.result);

    composableReturn.onResult((newResult) => {
      result.value = newResult;
    });

    composableReturn.onError(() => {
      result.value = null;
    });

    return { ...composableReturn, result };
  };

  return queryWrapper as any;
};

export default useQueryReactiveResult;
