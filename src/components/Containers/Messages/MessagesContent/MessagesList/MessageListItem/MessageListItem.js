import React, { useContext, useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { borderSeparator, blueGradient } from '../../../../../../styles/styleVariables';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Context
import { MessagesContext } from '../../MessagesContent';
import { CollectionContext } from '../../../MessagesMain';

// Children
import MessageListItemContentRight from './MessageListItemContentRight';
import MessageListItemContentLeft from './MessageListItemContentLeft';

const MessageListItem = ({ message, i }) => {
  const messageRef = useRef();
  const [highlightElement, setHighlightElement] = useState(false);
  const { checkMessage, checkedMessages } = useContext(MessagesContext);
  const { messages, listPlaceholder, setListPlaceholder } = useContext(CollectionContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const handleHighlightOnView = () => {
    setHighlightElement(true);
    setTimeout(() => setHighlightElement(false), 2000);
  };

  useEffect(() => {
    let timeout;
    if (listPlaceholder && listPlaceholder == i) {
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
  }, [listPlaceholder]);

  const handleSelectMessage = () => {
    console.log('setting list placeholder to : ', i);
    setListPlaceholder(i);
    history.push(`${pathname}/messages/${message.id}`);
  };

  const messageChecked = checkedMessages.includes(message.id);

  return (
    <MessageListItemStyled
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

  ${props =>
    props.highlightElement
      ? css`
          background: ${blueGradient};
        `
      : ''};

  h4,
  p {
    font-size: 1.2rem;
  }
`;

export default MessageListItem;
