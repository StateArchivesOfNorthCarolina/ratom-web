import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../../styles/styleVariables';

// Components
import Button from '../../../Components/Buttons/Button';

// Context
import { AccountContext } from '../MessagesMain';

const FilterActions = ({ sendQuery }) => {
  const { clearFilters } = useContext(AccountContext);

  return (
    <FilterActionsStyled>
      <Button neutral small onClick={clearFilters}>
        Reset
      </Button>
      <Button positive small onClick={sendQuery} data-cy="apply-search-button">
        Apply
      </Button>
    </FilterActionsStyled>
  );
};

const FilterActionsStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 3rem 0;
  border-bottom: ${borderSeparator};
`;

export default FilterActions;
