import React, { useContext } from 'react';
import styled from 'styled-components';

// Children
import SearchKeywords from './SearchKeywords';
import FilterActions from './FilterActions';

// Context
import { CollectionContext } from '../MessagesMain';

const FilterPanel = () => {
  const { setQuery } = useContext(CollectionContext);
  return (
    <FilterPanelStyled>
      <h4>Filter Panel</h4>
      <SearchKeywords />
      <FilterActions />
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
