import React, { useContext } from 'react';
import styled from 'styled-components';

// Context
import { MessageContext } from './MessageMain';
import ParsedMessageBody from './ParsedMessageBody';

const MessageDetail = () => {
  const { message } = useContext(MessageContext);

  return (
    <MessageDetailStyled>
      <MessageContent>
        <h3>{message.subject}</h3>
        <p>{message.msg_to}</p>
        <p>{message.msg_from}</p>
        <ParsedMessageBody message={message} />
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
