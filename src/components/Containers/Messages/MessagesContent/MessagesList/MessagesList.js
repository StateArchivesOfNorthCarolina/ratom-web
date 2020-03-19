import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  LIST_VARIANTS,
  LIST_ITEM_VARIANTS
} from '../../../../Components/Animated/animationConstants';

// Context
import { AccountContext } from '../../MessagesMain';

// Children
import MessageListItem from './MessageListItem/MessageListItem';
import ScrollShadow from '../../../../Components/ScrollShadow';
import { borderSeparator } from '../../../../../styles/styleVariables';

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
    <>
      <MessagesListStyled
        ref={messagesUL}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={LIST_VARIANTS}
        data-cy="messages-list"
      >
        <ScrollShadow position="top" innerWidth="100%" />
        {messages.map((message, i) => (
          <MessageListItem key={message.id} message={message} i={i} variants={LIST_ITEM_VARIANTS} />
        ))}
        <ScrollShadow position="bottom" innerWidth="100%" />
      </MessagesListStyled>
      <BorderDiv />
    </>
  );
};

const MessagesListStyled = styled(motion.div)`
  position: relative;
  flex: 1;
  overflow: scroll;
  width: 100%;
  padding: 3rem 3rem 0 3rem;
`;

const BorderDiv = styled.div`
  border-top: ${borderSeparator};
  margin: 0 5rem;
`;

export default MessagesList;
