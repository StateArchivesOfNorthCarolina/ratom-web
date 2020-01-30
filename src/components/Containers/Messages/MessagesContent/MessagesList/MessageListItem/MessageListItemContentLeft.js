import React from 'react';
import styled from 'styled-components';
import MessageCheckbox from './MessageCheckbox';

const MessageListItemContentLeft = ({ message, checked, checkMessage }) => {
  const getHighlights = () => {
    if (message && message.hasOwnProperty('highlight')) {
      return Object.keys(message.highlight).map(key => ({
        type: key,
        highlights: message.highlight[key]
      }));
    }
    return [];
  };

  return (
    <ContentLeft>
      <MessageCheckbox checked={checked} onChange={() => checkMessage(message.id)} />
      <InnerContent>
        <h4>{message.subject}</h4>
        <p>From: {message.msg_from}</p>
        <MessageHighlights>
          {getHighlights().map((h, i) => (
            <Highlight key={i}>
              {/* <p>{h.type}: </p> */}
              {h.highlights.map((m, j) => (
                <p key={j}>
                  ...
                  <span
                    dangerouslySetInnerHTML={{
                      __html: m
                    }}
                  ></span>
                  ...
                </p>
              ))}
            </Highlight>
          ))}
        </MessageHighlights>
      </InnerContent>
    </ContentLeft>
  );
};

const ContentLeft = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 15rem;
  overflow-y: hidden;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h4 {
    margin: 0;
  }

  > p {
    margin: 0.5rem 0;
  }
`;

const MessageHighlights = styled.div`
`;

const Highlight = styled.div`
  span {
    font-size: 1rem;
  }
  strong {
    color: ${props => props.theme.colorPrimary};
  }
`;

export default MessageListItemContentLeft;
