import { gql } from 'apollo-boost';
import { DEFAULT_PAGINATION_LIMIT } from '../../constants/applicationConstants';

// TODO: Add collectionId! filter: { collectionId: $collectionId }
export const FILTER_MESSAGES = gql`
  query FilterMessages(
    $after: String
    $filter: GrapheneElasticFilterMessageElasticsearchNodeConnectionBackendFilter
    $search: GrapheneElasticSearchMessageElasticsearchNodeConnectionBackendFilter
  ) {
    filterMessages(
      first: ${DEFAULT_PAGINATION_LIMIT}
      after: $after
      filter: $filter
      search: $search
      facets: [labels, sent_date]
      highlight: [msg_to, msg_from, msg_subject, msg_body]
    ) {
      facets
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          pk
          msgFrom
          msgSubject
          msgBody
          sentDate
          processor
          highlight
          labels
        }
      }
    }
  }
`;

export const GET_MESSAGE = gql`
  query GetMessage($pk: Int) {
    message(pk: $pk) {
      sentDate
      labels
      msgTo
      msgFrom
      msgSubject
      msgBody
      processor {
        processed
        isRecord
        hasPii
      }
    }
  }
`;
