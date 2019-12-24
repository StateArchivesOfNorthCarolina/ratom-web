import React, { createContext, useState, useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator, colorWhite } from '../../../../styles/styleVariables';

// Children
import ResultsSummary from './ResultsSummary';
import MessagesList from './MessagesList/MessagesList';
import MessagesActions from './MessagesActions';
import Pagination from '../../../Components/Pagination/Pagination';
import { CollectionContext } from '../MessagesMain';

export const MessagesContext = createContext(null);

const MessagesContent = () => {
  const { messages } = useContext(CollectionContext);
  const [checkedMessages, setCheckedMessages] = useState([]);

  const checkAllMessages = all => {
    if (all) {
      setCheckedMessages(messages.map(m => m.id));
    } else {
      setCheckedMessages([]);
    }
  };

  const checkMessage = messageId => {
    const messageIndex = checkedMessages.indexOf(messageId);
    if (messageIndex > -1) {
      const messagesWithout = [...checkedMessages];
      messagesWithout.splice(messageIndex, 1);
      setCheckedMessages(messagesWithout);
    } else {
      setCheckedMessages([...checkedMessages, messageId]);
    }
  };

  return (
    <MessagesContext.Provider
      value={{
        checkedMessages,
        checkMessage,
        checkAllMessages
      }}
    >
      <MessagesContentStyled>
        <ResultsSummary />
        <MessagesList />
        <FixedToBottom>
          <MessagesActions />
          <Pagination />
        </FixedToBottom>
      </MessagesContentStyled>
    </MessagesContext.Provider>
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
