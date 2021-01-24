import { gql } from '@apollo/client/core';
import { useResult } from '@vue/apollo-composable';

import { usegetCurrentUserQuery } from '@/plugins/apollo/composables';

// TODO
// interface UseGetUser {
//   deleteBasket;
//   onDone;
// }

// ====================================================
// Query
// ====================================================

gql`
  query getCurrentUser {
    getCurrentUser {
      email
      nameFamily
      nameGiven
      nameDisplay
      photo
    }
  }
`;

// ====================================================
// Composable
// ====================================================

const useGetCurrentUser = (): any => {
  const { result, loading } = usegetCurrentUserQuery();

  const user = useResult(result, null, (data) => data);

  return { user, loading };
};

export default useGetCurrentUser;
