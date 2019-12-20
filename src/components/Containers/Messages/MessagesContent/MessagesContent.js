import React from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../../styles/styleVariables';

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
      <MessagesActions />
      <Pagination />
    </MessagesContentStyled>
  );
};

const MessagesContentStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: ${borderSeparator};
`;

export default MessagesContent;
