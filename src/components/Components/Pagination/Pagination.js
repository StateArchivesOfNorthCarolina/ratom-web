import React from 'react';
import styled from 'styled-components';
import { standardPadding, colorWhite } from '../../../styles/styleVariables';

const Pagination = () => {
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

  position: fixed;
  bottom: 0;
  background-color: ${colorWhite};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Pagination;
