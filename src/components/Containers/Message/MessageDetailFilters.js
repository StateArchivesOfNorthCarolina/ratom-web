import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator, colorBlackLight } from '../../../styles/styleVariables';

// Context
import { AccountContext } from '../Messages/MessagesMain';
import Keyword from '../Messages/Keyword';
import { Badge } from '../../Components/Labels/Badge';

const MessageDetailFilters = () => {
  const { query } = useContext(AccountContext);
  return (
    <MessageDetailFiltersStyled>
      {query.keywords && query.keywords.length > 0 && (
        <Keywords data-cy="message-detail-filter__keywords">
          <h3>Keywords</h3>
          <div>
            {query.keywords.map(keyword => (
              <Keyword key={keyword} name={keyword} />
            ))}
          </div>
        </Keywords>
      )}

      {query.labels && query.labels.length > 0 && (
        <Tags data-cy="message-detail-filter__tags">
          <h3>Labels</h3>
          <div>
            {query.labels.map(label => (
              <Badge key={label.name} {...label} />
            ))}
          </div>
        </Tags>
      )}

      {query.processedStatus && query.processedStatus !== 'All' && (
        <ProcessedStatus data-cy="message-detail-filter__processed">
          <h3>Message processed status</h3>
          <p>{query.processedStatus}</p>
        </ProcessedStatus>
      )}

      {query.addresses && query.addresses.length > 0 && (
        <Addresses data-cy="message-detail-filter__addresses">
          <h3>Email addresses</h3>
          <div>
            {query.addresses.map(address => (
              <Keyword key={address} name={address} />
            ))}
          </div>
        </Addresses>
      )}

      {query.dateRange && query.dateRange.length > 0 && (
        <Dates>
          <h3>Date range</h3>
          <div>
            <h6>From:</h6>
            <p>{query.dateRange[0]}</p>
          </div>
          <div>
            <h6>To:</h6>
            <p>{query.dateRange[1]}</p>
          </div>
        </Dates>
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

const Dates = styled(DetailFilterItem)`
  div {
    margin: 1rem 0 1rem 0.5rem;
  }
  h6 {
    color: ${colorBlackLight};
    font-size: 1.5rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
`;

export default MessageDetailFilters;
