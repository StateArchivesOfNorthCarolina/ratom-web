import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Context
import { CollectionContext } from '../../MessagesMain';

// Children
import MessageListItem from './MessageListItem/MessageListItem';

const MessagesList = () => {
  const messagesUL = useRef();
  const { messages, loadMoreMessages } = useContext(CollectionContext);

  useEffect(() => {
    const element = messagesUL.current;
    if (element) {
      const scrollListener = () => {
        if (element.scrollTop + element.offsetHeight >= element.scrollHeight - 1) {
          loadMoreMessages();
        }
      };
      element.addEventListener('scroll', scrollListener);
      return () => element.removeEventListener('scroll', scrollListener);
    }
  }, [loadMoreMessages, messagesUL]);

  return (
    <MessagesListStyled ref={messagesUL}>
      {messages.map((message, i) => (
        <MessageListItem key={message.id} message={message} i={i} />
      ))}
    </MessagesListStyled>
  );
};

const MessagesListStyled = styled.div`
  /* flex: 1; */
  /* SUPER TEMP FIX... */
  height: 57vh;
  overflow: scroll;
  width: 100%;
  padding: 3rem 3rem 0 3rem;
`;

export default MessagesList;
