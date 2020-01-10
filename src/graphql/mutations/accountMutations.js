import { gql } from 'apollo-boost';

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $description: String!, $url: String!) {
    createAccount(name: $name, description: $description, url: $url) {
      name
      description
      status
    }
  }
`;
