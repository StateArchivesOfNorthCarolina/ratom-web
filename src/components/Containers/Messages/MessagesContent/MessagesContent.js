import React from 'react';
import styled from 'styled-components';
import { borderSeparator, colorWhite } from '../../../../styles/styleVariables';

// Children
import ResultsSummary from './ResultsSummary';
import MessagesList from './MessagesList/MessagesList';
import MessagesActions from './MessagesActions';
import Pagination from '../../../Components/Pagination/Pagination';

const MessagesContent = () => {
  return (
    <MessagesContentStyled>
      <ResultsSummary />
      <MessagesList />
      <FixedToBottom>
        <MessagesActions />
        <Pagination />
      </FixedToBottom>
    </MessagesContentStyled>
  );
};

const MessagesContentStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: ${borderSeparator};
`;

const FixedToBottom = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${colorWhite};
`;

export default MessagesContent;
