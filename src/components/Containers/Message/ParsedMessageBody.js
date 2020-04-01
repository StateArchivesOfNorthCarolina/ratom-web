import React, { useContext } from 'react';
import styled from 'styled-components';
import { colorPrimary } from '../../../styles/styleVariables';

// Context
import { MessageContext } from './MessageMain';

const ParsedMessageBody = ({ message }) => {
  const { viewAsPlaintext } = useContext(MessageContext);
  return (
    <MessageBodyWrapper>
      <MessageBodyStart>START MESSAGE BODY</MessageBodyStart>
      {viewAsPlaintext ? (
        <PlainBodyContent>{message.body}</PlainBodyContent>
      ) : (
        <HtmlBodyContent dangerouslySetInnerHTML={{ __html: message.body }} />
      )}

      <MessageBodyEnd>END MESSAGE BODY</MessageBodyEnd>
    </MessageBodyWrapper>
  );
};

const MessageBodyWrapper = styled.div`
  /* padding: 1rem;
  margin: 1rem 0; */
`;

const MessageBodyDivider = styled.p`
  width: 100%;
  text-align: center;
  color: ${colorPrimary};
`;

const MessageBodyStart = styled(MessageBodyDivider)`
  border-bottom: 1px dashed ${colorPrimary};
  margin-bottom: 1rem;
`;

const MessageBodyEnd = styled(MessageBodyDivider)`
  border-top: 1px dashed ${colorPrimary};
  margin-top: 1rem;
`;

const HtmlBodyContent = styled.div`
  padding: 0 2rem;
`;

const PlainBodyContent = styled.div`
  white-space: pre-wrap;
`;

export default ParsedMessageBody;
