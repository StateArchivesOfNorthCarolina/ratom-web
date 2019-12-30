import React from 'react';
import styled from 'styled-components';
import MessageCheckbox from './MessageCheckbox';

const MessageListItemContentLeft = ({ message, checked, checkMessage }) => {
  // TODO: This eventually...prolly
  // const getHighlights = () => {
  //   if (message && message.hasOwnProperty('highlight')) {
  //     return Object.keys(message.highlight).map(key => ({
  //       type: key,
  //       hightlights: message.highlight[key]
  //     }));
  //   }
  //   return [];
  // };

  // TODO: remove vv once we've decided about how to show highlights
  const getHighlights = () => {
    if (message && message.hasOwnProperty('highlight') && message.highlight) {
      if (message.highlight.msg_body) {
        return [
          {
            type: 'body',
            highlights: [message.highlight.msg_body[0]]
          }
        ];
      }
    }
    return [];
  };

  return (
    <ContentLeft>
      <MessageCheckbox checked={checked} onChange={() => checkMessage(message.id)} />
      <InnerContent>
        <h4>{message.msgSubject}</h4>
        <p>From: {message.msgFrom}</p>
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

const MessageHighlights = styled.div``;

const Highlight = styled.div`
  span {
    font-size: 1rem;
  }
  strong {
    color: ${props => props.theme.colorPrimary};
  }
`;

export default MessageListItemContentLeft;
