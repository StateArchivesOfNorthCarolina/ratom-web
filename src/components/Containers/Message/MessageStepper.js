import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Context
import { CollectionContext } from '../Messages/MessagesMain';

const MessageStepper = props => {
  const { pathname } = useLocation();
  const history = useHistory();
  const {
    messages,
    messageIndex,
    setMessageIndex,
    messagesTotalCount,
    query,
    setQuery,
    queryMessages
  } = useContext(CollectionContext);

  useEffect(() => {
    // TODO: here we need to handle the case of a user navigating directly to this page,
    // TODO: this will mean that messageIndex and messageCursor will be unset. So:
    // TODO: Get messageIndex and messageCursor.
    // every time I load, do this.
  });

  const handleStep = direction => {
    const messagesShown = messages.length;
    if (messageIndex === 0 && direction === 'left') return;
    if (messageIndex === messagesShown - 1 && direction === 'right') {
      // TODO: Do something here...
    } else {
      let newMessageId;
      if (direction === 'left') {
        newMessageId = messages[messageIndex - 1].id;
        setMessageIndex(messageIndex - 1);
      }
      if (direction === 'right') {
        newMessageId = messages[messageIndex + 1].id;
        setMessageIndex(messageIndex + 1);
      }
      const newPath = pathname.split('messages/')[0] + 'messages/' + newMessageId;
      history.push(newPath);
    }
  };

  if (messageIndex >= 0) {
    return (
      <MessageStepperStyled {...props}>
        <StepperStyled
          icon={faArrowLeft}
          disabled={messageIndex === 0}
          onClick={() => handleStep('left')}
        />
        <StepperDetails>
          Showing
          <span> {messageIndex + 1}</span> of {messagesTotalCount}
        </StepperDetails>
        <StepperStyled
          icon={faArrowRight}
          disabled={messageIndex === messagesTotalCount}
          onClick={() => handleStep('right')}
        />
      </MessageStepperStyled>
    );
  }

  return null;
};

const MessageStepperStyled = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;

const StepperDetails = styled.p`
  margin: 0 2rem;
  font-size: 1.5rem;
  span {
    color: ${props => props.theme.colorPrimary};
  }
`;

const StepperStyled = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colorPrimary};
  font-size: 2rem;
  cursor: pointer;
`;

export default MessageStepper;
