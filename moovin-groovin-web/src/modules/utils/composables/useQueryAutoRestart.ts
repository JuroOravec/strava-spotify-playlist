import type { UseQueryReturn } from '@vue/apollo-composable';
import { unref } from '@vue/composition-api';

/** Wraps useQuery to override refetch to restart query on refetch if query is complete */
const useQueryAutoRestart = <T extends (...args: any[]) => UseQueryReturn<any, any>>(
  query: T
): T => {
  const queryWrapper = (...args: Parameters<T>): ReturnType<T> => {
    const composableReturn = query(...args) as ReturnType<T>;

    const refetch = (...args: Parameters<typeof composableReturn.refetch>) => {
      if (!unref(composableReturn.query)) return composableReturn.start();
      if (!unref(composableReturn.loading)) composableReturn.refetch(...args);
    };

    return { ...composableReturn, refetch };
  };

  return queryWrapper as any;
};

export default useQueryAutoRestart;
