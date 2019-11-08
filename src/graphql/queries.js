import { gql } from "apollo-boost";

export const emailQuery = ({ emailId }) => {
  return `
        query {
            email(id: ${emailId}) {
                subject
                content
            }
        }
    `;
};

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

export const AllMessagesQuery = gql`
  {
    allMessages(first: 10) {
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
