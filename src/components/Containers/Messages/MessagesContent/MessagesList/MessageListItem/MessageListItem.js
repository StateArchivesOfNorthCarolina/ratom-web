import React from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding } from '../../../../../../styles/styleVariables';

// Router
import { useHistory, useLocation } from 'react-router-dom';
import MessageListItemContentRight from './MessageListItemContentRight';
import MessageListItemContentLeft from './MessageListItemContentLeft';

const MessageListItem = ({ message }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleSelectMessage = () => {
    // TODO: stick it in context or whatever
    // TODO: maybe including the cursor?
    history.push(`${pathname}/messages/${message.pk}`);
  };

  return (
    <MessageListItemStyled data-cy="messages_list_item">
      <MessageListItemContentLeft message={message} />
      <MessageListItemContentRight handleSelectMessage={handleSelectMessage} />
    </MessageListItemStyled>
  );
};

const MessageListItemStyled = styled.div`
  height: 15rem;
  border-bottom: ${borderSeparator};
  padding: 2rem 2rem 2rem ${standardPadding};
  margin: 0 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default MessageListItem;
