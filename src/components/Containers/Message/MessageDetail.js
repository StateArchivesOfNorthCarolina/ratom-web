import React, { useContext } from 'react';
import styled from 'styled-components';

// Context
import { MessageContext } from './MessageMain';

const MessageDetail = () => {
  const { message } = useContext(MessageContext);

  return (
    <MessageDetailStyled>
      <MessageContent>
        <h3>{message.subject}</h3>
        <p>{message.msg_to}</p>
        <p>{message.msg_from}</p>
        <p>{message.body}</p>
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
