import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../../styles/styleVariables';

// Util
import { objectIsEmpty } from '../../../../util/objectIsEmpty';

// Components
import Button from '../../../Components/Buttons/Button';

// Context
import { CollectionContext } from '../MessagesMain';

const FilterActions = () => {
  const { query, setQuery, queryMessages } = useContext(CollectionContext);

  const handleSetQuery = newQuery => {
    if (objectIsEmpty(newQuery)) setQuery(newQuery);
    else {
      const derivedQuery = {
        ...query,
        newQuery
      };
      setQuery(derivedQuery);
    }
  };

  return (
    <FilterActionsStyled>
      <Button neutral small handleSetQuery={() => handleSetQuery({})}>
        Reset
      </Button>
      <Button positive small onClick={queryMessages}>
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
