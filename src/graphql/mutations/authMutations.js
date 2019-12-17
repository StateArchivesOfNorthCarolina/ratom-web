import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(username: $email, password: $password) {
      token
      user {
        id
        email
        username
        firstName
        lastName
        lastLogin
      }
    }
  }
`;
