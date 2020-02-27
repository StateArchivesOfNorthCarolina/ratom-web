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
import LabelFilter from './LabelFilter/LabelFilter';

const FilterPanel = () => {
  const { setQuery, filterQuery, setFilterQuery } = useContext(AccountContext);

  const sendQuery = () => {
    setQuery(filterQuery);
    // searchMessages();
  };

  return (
    <FilterPanelStyled>
      <FilterActions sendQuery={sendQuery} />
      <KeywordFilter buildQuery={setFilterQuery} filterQuery={filterQuery} sendQuery={sendQuery} />
      <LabelFilter buildQuery={setFilterQuery} filterQuery={filterQuery} />
      <ProcessedStatusFilter buildQuery={setFilterQuery} filterQuery={filterQuery} />
      <EmailFilter buildQuery={setFilterQuery} filterQuery={filterQuery} sendQuery={sendQuery} />
      <DateRangeFilter buildQuery={setFilterQuery} filterQuery={filterQuery} />
    </FilterPanelStyled>
  );
};

const FilterPanelStyled = styled.aside`
  width: 26rem;
  height: auto;

  display: flex;
  flex-direction: column;
  overflow: scroll;

  h4 {
    text-align: center;
    padding: 2rem;
  }
`;

export default FilterPanel;
