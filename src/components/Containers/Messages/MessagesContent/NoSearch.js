import React from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../../styles/styleVariables';

const NoSearch = () => {
  return (
    <NoSearchStyled>
      <h2>No search parameters given</h2>
    </NoSearchStyled>
  );
};

const NoSearchStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  border-left: ${borderSeparator};

  h2 {
    margin-top: 30rem;
  }
`;

export default NoSearch;
