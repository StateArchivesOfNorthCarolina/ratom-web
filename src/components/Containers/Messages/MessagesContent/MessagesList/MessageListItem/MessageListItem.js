import React, { useContext, useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { borderSeparator, blueGradient } from '../../../../../../styles/styleVariables';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Context
import { MessagesContext } from '../../MessagesContent';
import { AccountContext } from '../../../MessagesMain';

// Children
import MessageListItemContentRight from './MessageListItemContentRight';
import MessageListItemContentLeft from './MessageListItemContentLeft';

const MessageListItem = ({ message, i, ...props }) => {
  const messageRef = useRef();
  const [highlightElement, setHighlightElement] = useState(false);
  const { checkMessage, checkedMessages } = useContext(MessagesContext);
  const { listPlaceholder, setListPlaceholder } = useContext(AccountContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const handleHighlightOnView = () => {
    setHighlightElement(true);
    setTimeout(() => setHighlightElement(false), 2000);
  };

  useEffect(() => {
    let timeout;
    if (listPlaceholder && listPlaceholder === i) {
      const element = messageRef.current;
      const intersectionObserver = new IntersectionObserver(entries => {
        let [entry] = entries;
        if (entry.isIntersecting) {
          timeout = setTimeout(handleHighlightOnView, 100);
        }
      });
      intersectionObserver.observe(element);

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    return () => clearTimeout(timeout);
  }, [listPlaceholder, i]);

  const handleSelectMessage = () => {
    setListPlaceholder(i);
    history.push(`${pathname}/messages/${message.id}`, { reset: false });
  };

  const messageChecked = checkedMessages.includes(message.id);

  return (
    <MessageListItemStyled
      {...props}
      data-cy="messages_list_item"
      messageChecked={messageChecked}
      ref={messageRef}
      highlightElement={highlightElement}
    >
      <MessageListItemContentLeft
        message={message}
        checked={messageChecked}
        checkMessage={checkMessage}
      />
      <MessageListItemContentRight message={message} handleSelectMessage={handleSelectMessage} />
    </MessageListItemStyled>
  );
};

const MessageListItemStyled = styled(motion.div)`
  min-height: 26%;
  max-height: 20rem;
  border-bottom: ${borderSeparator};
  padding: 2rem 0;
  margin: 0 3rem;

  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;

  background: ${props => (props.messageChecked ? blueGradient : 'inherit')};

  ${props =>
    props.highlightElement
      ? css`
          background: ${blueGradient};
        `
      : ''};

  h4,
  > p {
    font-size: 1.2rem;
  }
`;

export default MessageListItem;
