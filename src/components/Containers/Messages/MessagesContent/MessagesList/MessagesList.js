import React, { useContext, useRef, useCallback, useState } from 'react';
import styled from 'styled-components';

// Context
import { CollectionContext } from '../../MessagesMain';

// Hooks
import useScrollToBottom from '../../../../Hooks/useScrollToBottom';

// Children
import MessageListItem from './MessageListItem/MessageListItem';
import AnimatedList from '../../../../Components/Animated/AnimatedList';

const MessagesList = () => {
  // const messagesUL = useRef(null);
  const [element, setElement] = useState(document.body);
  const { messages, loadMoreMessages } = useContext(CollectionContext);
  const bottom = useScrollToBottom(element, loadMoreMessages);
  // const clientHeight = document.documentElement.clientHeight || window.innerHeight;

  // console.log('clientHeight: ', clientHeight);
  // console.log('scroll Y: ', y);
  // console.log(messagesUL);

  const measuredUlRef = useCallback(node => {
    if (node !== null) {
      setElement(node);
    }
  }, []);

  console.log('messages.length: ', messages.length);

  return (
    <MessagesListStyled ref={measuredUlRef}>
      {messages.map(({ node: message }) => (
        <MessageListItem key={message.id} message={message} />
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
