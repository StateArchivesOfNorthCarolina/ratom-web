import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../styles/styleVariables';

// Context
import { AccountContext } from '../Messages/MessagesMain';
import Keyword from '../Messages/Keyword';

const MessageDetailFilters = props => {
  const { query } = useContext(AccountContext);
  console.log('query in message detail: ', query);
  return (
    <MessageDetailFiltersStyled>
      {query.keywords && query.keywords.length > 0 && (
        <Keywords data-cy="message-detail-filter__keywords">
          <h3>Keywords</h3>
          <div>
            {query.keywords.map(keyword => (
              <Keyword name={keyword} />
            ))}
          </div>
        </Keywords>
      )}

      {query.processedStatus && query.processedStatus !== 'All' && (
        <ProcessedStatus data-cy="message-detail-filter__processed">
          <h3>Message processed status</h3>
          <p>{query.processedStatus}</p>
        </ProcessedStatus>
      )}

      {query.tags && query.tags.length > 0 && (
        <Tags data-cy="message-detail-filter__tags">
          <h3>Labels</h3>
          <div>
            {query.tags.map(tag => (
              <Keyword name={tag} />
            ))}
          </div>
        </Tags>
      )}

      {query.addresses && query.addresses.length > 0 && (
        <Addresses data-cy="message-detail-filter__addresses">
          <h3>Email addresses</h3>
          <div>
            {query.addresses.map(address => (
              <Keyword name={address} />
            ))}
          </div>
        </Addresses>
      )}
    </MessageDetailFiltersStyled>
  );
};

const MessageDetailFiltersStyled = styled.div`
  width: 25rem;
  border-right: ${borderSeparator};
`;

const DetailFilterItem = styled.div`
  padding: 2rem;
  border-bottom: ${borderSeparator};
`;

const Keywords = styled(DetailFilterItem)`
  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
`;

const ProcessedStatus = styled(DetailFilterItem)`
  p {
    margin-left: 1rem;
    font-size: 1.5rem;
  }
`;

const Tags = styled(DetailFilterItem)`
  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
`;

const Addresses = styled(DetailFilterItem)`
  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
`;

export default MessageDetailFilters;
