import React from 'react';
import styled from 'styled-components';

const ParsedMessageBody = ({ message }) => {
  return (
    <MessageBodyWrapper>
      <div dangerouslySetInnerHTML={{ __html: message.body }}></div>;
    </MessageBodyWrapper>
  );
};

const MessageBodyWrapper = styled.div`
  padding: 1rem;
  margin: 1rem 0;
`;

// const PreservedBody = styled.p`
//   white-space: pre-line;
// `;

export default ParsedMessageBody;
