import React, { useContext } from 'react';
import styled from 'styled-components';

// Children
import KeywordFilter from './KeywordFilter/KeywordFilter';
import FilterActions from './FilterActions';

// Context
import { AccountContext } from '../MessagesMain';
import ProcessedStatusFilter from './ProcessedStatusFilter/ProcessedStatusFilter';
import EmailFilter from './EmailFilter/EmailFilter';
import DateRangeFilter from './DateRangeFilter';

const FilterPanel = () => {
  const { setQuery, filterQuery, setFilterQuery } = useContext(AccountContext);

  const sendQuery = () => {
    setQuery(filterQuery);
    // searchMessages();
  };

  return (
    <FilterPanelStyled>
      <KeywordFilter buildQuery={setFilterQuery} filterQuery={filterQuery} sendQuery={sendQuery} />
      <ProcessedStatusFilter buildQuery={setFilterQuery} filterQuery={filterQuery} />
      <EmailFilter buildQuery={setFilterQuery} filterQuery={filterQuery} sendQuery={sendQuery} />
      <DateRangeFilter buildQuery={setFilterQuery} filterQuery={filterQuery} />
      <FilterActions sendQuery={sendQuery} />
    </FilterPanelStyled>
  );
};

const FilterPanelStyled = styled.aside`
  width: 26rem;
  height: auto;

  display: flex;
  flex-direction: column;

  h4 {
    text-align: center;
    padding: 2rem;
  }
`;

export default FilterPanel;
