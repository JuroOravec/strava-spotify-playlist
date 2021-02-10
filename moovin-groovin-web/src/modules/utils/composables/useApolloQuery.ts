import type { UseQueryReturn } from '@vue/apollo-composable';
import fpFlow from 'lodash/fp/flow';

import useQueryAutoRestart from './useQueryAutoRestart';
import useQueryReactiveResult from './useQueryReactiveResult';

/**
 * Wraps useQuery in following convenience composables:
 * - useQueryAutoRestart
 * - useQueryReactiveResult
 */
const useApolloQuery = <T extends (...args: any[]) => UseQueryReturn<any, any>>(query: T): T => {
  const wrappedQuery = fpFlow(useQueryAutoRestart, useQueryReactiveResult)(query);
  return wrappedQuery;
};

export default useApolloQuery;
