import React, { useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LIST_VARIANTS,
  LIST_ITEM_VARIANTS
} from '../../../../Components/Animated/animationConstants';
import styled from 'styled-components';

// Context
import { AccountContext } from '../../MessagesMain';

// Children
import MessageListItem from './MessageListItem/MessageListItem';

const MessagesList = () => {
  const messagesUL = useRef();
  const { messages, loadMoreMessages } = useContext(AccountContext);

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
    <MessagesListStyled
      ref={messagesUL}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={LIST_VARIANTS}
    >
      {messages.map((message, i) => (
        <MessageListItem key={message.id} message={message} i={i} variants={LIST_ITEM_VARIANTS} />
      ))}
    </MessagesListStyled>
  );
};

const MessagesListStyled = styled(motion.div)`
  /* flex: 1; */
  /* SUPER TEMP FIX... */
  height: 57vh;
  overflow: scroll;
  width: 100%;
  padding: 3rem 3rem 0 3rem;
`;

export default MessagesList;
