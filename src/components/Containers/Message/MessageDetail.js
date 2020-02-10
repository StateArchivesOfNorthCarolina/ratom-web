import React, { useContext } from 'react';
import styled from 'styled-components';
import { colorPrimary } from '../../../styles/styleVariables';

// Context
import { MessageContext } from './MessageMain';

const MessageDetail = () => {
  const { message } = useContext(MessageContext);

  return (
    <MessageDetailStyled>
      <MessageContent>
        <Subject dangerouslySetInnerHTML={{ __html: message.highlighted_subject }} />
        <ToText>{message.msg_to}</ToText>
        <FromText>{message.msg_from}</FromText>
        <BodyText dangerouslySetInnerHTML={{ __html: message.highlighted_body }} />
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

const Subject = styled.h3`
  strong {
    color: ${colorPrimary};
  }
`;

const ToText = styled.p``;

const FromText = styled.p``;

const BodyText = styled.p`
  strong {
    color: ${colorPrimary};
  }
`;

export default MessageDetail;
