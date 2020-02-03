import React, { useContext } from 'react';
import styled from 'styled-components';

// Children
import SearchKeywords from './SearchKeywords';
import FilterActions from './FilterActions';

// Context
import { AccountContext } from '../MessagesMain';

const FilterPanel = () => {
  const { setQuery, filterQuery, setFilterQuery } = useContext(AccountContext);

  const sendQuery = () => {
    setQuery(filterQuery);
    // searchMessages();
  };

  return (
    <FilterPanelStyled>
      <h4>Filter Panel</h4>
      <SearchKeywords buildQuery={setFilterQuery} filterQuery={filterQuery} sendQuery={sendQuery} />
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
