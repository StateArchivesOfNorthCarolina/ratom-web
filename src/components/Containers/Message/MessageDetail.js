import React, { useContext } from 'react';
import styled from 'styled-components';

// Context
import { MessageContext } from './MessageMain';

const MessageDetail = () => {
  const { message } = useContext(MessageContext);

  return (
    <MessageDetailStyled>
      <MessageContent>
        <h3>{message.msgSubject}</h3>
        <p>{message.msgTo}</p>
        <p>{message.msgFrom}</p>
        <p>{message.msgBody}</p>
      </MessageContent>
    </MessageDetailStyled>
  );
};

const MessageDetailStyled = styled.div`
  max-height: 72vh;
  overflow-y: scroll;

  width: 100%;
  padding: 2rem;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MessageDetail;
