import { gql } from 'apollo-boost';

// TODO: Add collectionId! filter: { collectionId: $collectionId }
export const FILTER_MESSAGES = gql`
  query FilterMessages($keywords: String!) {
    filterMessages(
      search: {
        msgTo: { value: $keywords }
        msgFrom: { value: $keywords }
        msgSubject: { value: $keywords }
        msgBody: { value: $keywords }
      }
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
