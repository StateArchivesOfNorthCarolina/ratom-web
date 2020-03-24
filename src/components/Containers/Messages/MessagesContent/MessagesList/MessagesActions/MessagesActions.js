import React from 'react';
import styled from 'styled-components';
import { borderSeparator, colorGreyLight } from '../../../../../../styles/styleVariables';

// Children
import SelectionActions from './SelectionActions';

const MessagesActions = () => {
  return (
    <>
      <MessagesActionsStyled>
        <SelectionActions />
      </MessagesActionsStyled>
    </>
  );
};

const MessagesActionsStyled = styled.div`
  height: 7rem;
  width: 100%;
  padding: 2rem 6rem;
  border-bottom: ${borderSeparator};

  background-color: ${colorGreyLight};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MessagesActions;
