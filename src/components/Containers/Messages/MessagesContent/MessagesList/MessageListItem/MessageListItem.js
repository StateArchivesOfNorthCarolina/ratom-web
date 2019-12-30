import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator, blueGradient } from '../../../../../../styles/styleVariables';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Context
import { MessagesContext } from '../../MessagesContent';

// Children
import MessageListItemContentRight from './MessageListItemContentRight';
import MessageListItemContentLeft from './MessageListItemContentLeft';

const MessageListItem = ({ message }) => {
  const { checkMessage, checkedMessages } = useContext(MessagesContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const handleSelectMessage = () => {
    // TODO: stick it in context or whatever
    // TODO: maybe including the cursor?
    history.push(`${pathname}/messages/${message.pk}`);
  };

  const messageChecked = checkedMessages.includes(message.id);

  return (
    <MessageListItemStyled data-cy="messages_list_item" messageChecked={messageChecked}>
      <MessageListItemContentLeft
        message={message}
        checked={messageChecked}
        checkMessage={checkMessage}
      />
      <MessageListItemContentRight handleSelectMessage={handleSelectMessage} />
    </MessageListItemStyled>
  );
};

const MessageListItemStyled = styled.div`
  height: 15rem;
  border-bottom: ${borderSeparator};
  padding: 2rem 0;
  margin: 0 3rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: ${props => (props.messageChecked ? blueGradient : 'inherit')};

  h4,
  p {
    font-size: 1.2rem;
  }
`;

export default MessageListItem;
