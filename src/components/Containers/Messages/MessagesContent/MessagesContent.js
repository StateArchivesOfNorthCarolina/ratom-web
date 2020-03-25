import React from 'react';
import styled from 'styled-components';
import { borderSeparator, colorWhite } from '../../../../styles/styleVariables';

// Children
import ResultsSummary from './ResultsSummary';
import MessagesList from './MessagesList/MessagesList';
import MessagesActions from './MessagesList/MessagesActions/MessagesActions';
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
  overflow-y: hidden;
`;

const FixedToBottom = styled.div`
  height: 14rem;
  width: 100%;
  background-color: ${colorWhite};
`;

export default MessagesContent;
