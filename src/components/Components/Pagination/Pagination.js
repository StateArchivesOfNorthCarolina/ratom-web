import React, { useContext } from 'react';
import styled from 'styled-components';
import { standardPadding } from '../../../styles/styleVariables';

// Context
import { CollectionContext } from '../../Containers/Messages/MessagesMain';

const Pagination = () => {
  const { pageInfo, facets } = useContext(CollectionContext);

  // go back = `before: startCursor`
  // go forward = `after: endCursor`

  // last 10,000, limit 10 -- does this basically say gimme 10,000 from the end, show me 10? Is it a reverse offset?

  return (
    <PaginationStyled>
      <h4>Pagination</h4>
    </PaginationStyled>
  );
};

const PaginationStyled = styled.div`
  height: 8rem;
  width: 100%;
  padding: ${standardPadding};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Pagination;
