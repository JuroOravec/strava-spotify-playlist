import { gql } from 'apollo-server-express';

const graphqlSchema = gql`
  type Query {
    hello: String
  }

  type Mutation {
    hello: String
  }
`;

export default graphqlSchema;
