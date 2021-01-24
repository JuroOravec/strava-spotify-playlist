import type { PossibleTypesMap } from '@apollo/client/core';

import schema from './schema.json';

interface IntrospectionResult {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

// Taken from https://www.apollographql.com/docs/react/data/fragments/#generating-possibletypes-automatically
const introspectionQueryResultToPossibleTypes = (
  introspectionQuery: IntrospectionResult
): PossibleTypesMap => {
  const possibleTypes: PossibleTypesMap = {};

  introspectionQuery.__schema.types.forEach((supertype) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
    }
  });

  return possibleTypes;
};

const possibleTypes = introspectionQueryResultToPossibleTypes(
  // @ts-ignore
  schema
);

export default possibleTypes;
