import React, { useContext, useRef, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';

// Context
import { CollectionContext } from '../../MessagesMain';

// Children
import MessageListItem from './MessageListItem/MessageListItem';
import AnimatedList from '../../../../Components/Animated/AnimatedList';

const MessagesList = () => {
  const messagesUL = useRef();
  const { messages, loadMoreMessages } = useContext(CollectionContext);

  useEffect(() => {
    const element = messagesUL.current;
    const scrollListener = () => {
      if (element.scrollTop + element.offsetHeight >= element.scrollHeight - 1) {
        loadMoreMessages();
      }
    };
    element.addEventListener('scroll', scrollListener);
    return () => element.removeEventListener('scroll', scrollListener);
  }, [loadMoreMessages]);

  return (
    <MessagesListStyled ref={messagesUL}>
      {messages.map(({ node: message }, i) => (
        <MessageListItem key={message.id} message={message} i={i} />
      ))}
    </MessagesListStyled>
  );
};

// const MessagesListStyled = styled(AnimatedList)`
const MessagesListStyled = styled.div`
  /* flex: 1; */
  /* SUPER TEMP FIX... */
  height: 57vh;
  overflow: scroll;
  width: 100%;
  padding: 3rem 3rem 0 3rem;
`;

export default MessagesList;
