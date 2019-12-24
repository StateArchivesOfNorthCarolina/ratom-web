import React from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../../styles/styleVariables';

const MessagesActions = () => {
  return (
    <MessagesActionsStyled>
      <h4>Messages Actions</h4>
    </MessagesActionsStyled>
  );
};

const MessagesActionsStyled = styled.div`
  height: 7rem;
  width: 100%;
  padding: 2rem;
  border-top: ${borderSeparator};
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MessagesActions;
