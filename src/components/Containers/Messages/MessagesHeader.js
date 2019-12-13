import React from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding } from '../../../styles/styleVariables';

const MessagesHeader = () => {
    return (
        <MessagesHeaderStyled >
            <h2>Messages Header</h2>
        </MessagesHeaderStyled>
    )
}

const MessagesHeaderStyled = styled.header`
  height: 8.5rem;
  width: 100%;
  padding: ${standardPadding};
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MessagesHeader;
