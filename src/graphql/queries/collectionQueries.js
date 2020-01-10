import { gql } from 'apollo-boost';

export const MY_COLLECTIONS = gql`
  query {
    myCollections {
      edges {
        node {
          id
          title
          accessionDate
        }
      }
    }
  }
`;

export const IMPORT_STATUS = gql`
  query {
    importStatus {
      status
      details
    }
  }
`;
