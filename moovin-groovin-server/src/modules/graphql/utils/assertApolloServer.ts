import type { ApolloServer } from 'apollo-server-express';

function assertApolloServer(
  apollo: ApolloServer | null,
  callee?: string
): asserts apollo {
  if (apollo) return;

  let errorMessage =
    'Tried to access ApolloServer before it has been installed.';
  if (callee) {
    errorMessage += ` (accessed from "${callee}")`;
  }

  throw Error(errorMessage);
}

export default assertApolloServer;
