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
      <ResetButton neutral small onClick={clearFilters} data-cy="reset-filters">
        Reset
      </ResetButton>
      <ApplyButton positive small onClick={sendQuery} data-cy="apply-search-button">
        Apply
      </ApplyButton>
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

const ActionButton = styled(Button)`
  width: 10rem;
  font-size: 1.5rem;
`;

const ResetButton = styled(ActionButton)``;

const ApplyButton = styled(ActionButton)``;

export default FilterActions;
