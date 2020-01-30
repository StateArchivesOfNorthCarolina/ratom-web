import React from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../../styles/styleVariables';

const NoContent = () => {
  return (
    <NoContentStyled>
      <h4>No messages match your query.</h4>
    </NoContentStyled>
  );
};

const NoContentStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: ${borderSeparator};
`;

export default NoContent;
