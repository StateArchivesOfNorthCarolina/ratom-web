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

export const ALL_COLLECTIONS = gql`
  {
    allCollections {
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
