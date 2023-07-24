import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    username: String
    name: String
  }

  type Query {
    getAllUsers: [User]
  }
`;
