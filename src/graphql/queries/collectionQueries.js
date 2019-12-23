import { gql } from 'apollo-boost';
import { buildKeywordSearchString } from '../../util/createMessagesQuery';

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

export const SingleMessageQuery = gql`
  query SingleMessageQuery($currentMessageId: ID!) {
    message(id: $currentMessageId) {
      id
      messageId
      msgFrom
      msgTo
      msgSubject
      sentDate
      msgBody
    }
  }
`;

export const makeCustomMessagesQuery = searchBy => {
  if (!searchBy) {
    throw new Error('You must provide filter/keyword parameters to query Messages');
  }
  return gql`
    query ($searchString: String) {
        allMessages(
            ${buildKeywordSearchString(searchBy)}
        ) {
        pageInfo {
            hasNextPage
            endCursor
        }
        edges {
            node {
            id
            messageId
            msgFrom
            msgTo
            msgSubject
            sentDate
            msgBody
            }
        }
        }
    }
`;
};

// export const getCustomMessagesQuery = searchBy => {
//   return gql`
//   query ($searchString: String) {
//     allMessages(${searchBy}_Icontains: $searchString) {
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//       edges {
//         node {
//           id
//           messageId
//           msgFrom
//           msgTo
//           msgSubject
//           sentDate
//           msgBody
//         }
//       }
//     }
//   }
// `;
// };
