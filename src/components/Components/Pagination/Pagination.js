import React, { useContext } from 'react';
import styled from 'styled-components';
import { standardPadding } from '../../../styles/styleVariables';

// Context
import { AccountContext } from '../../Containers/Messages/MessagesMain';

const Pagination = props => {
  const { messages, messagesTotalCount } = useContext(AccountContext);

  return (
    <PaginationStyled {...props}>
      <ResultsTotals>
        <h4>Showing </h4> <MessagesCount>{messages.length}</MessagesCount>
        <h4>of </h4> <h5 data-cy="search-results__count">{messagesTotalCount}</h5>
      </ResultsTotals>
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
  justify-content: center;

  /* span {

  } */
`;

const ResultsTotals = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h4 {
    margin: 0 1rem;
  }
`;

const MessagesCount = styled.span`
  color: ${props => props.theme.colorPrimary};
  font-weight: bold;
`;

export default Pagination;
