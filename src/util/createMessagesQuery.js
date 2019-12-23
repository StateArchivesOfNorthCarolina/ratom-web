/**
 * Possible search types:
 *
 * Date range:
 *      filter: {sentDate: {range: { lower: {datetime:""}, upper: {datetime:""}}} }
 *
 * Processed/Unprocessed
 *      can't currently search on nested data
 *      NOTE: Use custom resolver.
 *         def resolve_has_pii(self):
 *             return Message.objects.filter(processor__has_pii=True)
 *              or something
 *
 * Tag
 *      filter: {tag: {terms: ["PERSON", "SSN"]}}
 *      NOTE: can't currently do an AND query here
 *
 * Folder
 *      filter: {directory: {icontains: "Inbox" }}
 *
 * Keyword
 *      search: {msgBody: {in: "keyword1, keyword2" }}
 *
 */
import { gql } from 'apollo-boost';

export function buildKeywordSearchString(search) {
  return `search: {${Object.keys(search).map(key => {
    return ` ${key}: {in: "${search[key].join(', ')}"}`;
  })}}`;
}

export function createMessagesQuery(query) {
  let searchString = '';
  if (query.keywords) {
    searchString = buildKeywordSearchString(query.keywords);
  }

  console.log('searchString: ', searchString);
  return gql`
      query FilterMessages {
        filterMessages(
            ${searchString}
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
}

// export const makeCustomMessagesQuery = searchBy => {
//   return gql`
//     query ($searchString: String) {
//         allMessages(
//             ${buildKeywordSearchString(searchBy)}
//         ) {
//         pageInfo {
//             hasNextPage
//             endCursor
//         }
//         edges {
//             node {
//             id
//             messageId
//             msgFrom
//             msgTo
//             msgSubject
//             sentDate
//             msgBody
//             }
//         }
//         }
//     }
// `;
// };
