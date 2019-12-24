import React from 'react';
import styled from 'styled-components';
import MessageCheckbox from './MessageCheckbox';

const MessageListItemContentLeft = ({ message }) => {
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
      <MessageCheckbox />
      <div>
        <h4>from: {message.msgFrom}</h4>
        <p>subject: {message.msgSubject}</p>
        {getHighlights().map((h, i) => (
          <div key={i}>
            <p>{h.type}: </p>
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
          </div>
        ))}
      </div>
    </ContentLeft>
  );
};

const ContentLeft = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default MessageListItemContentLeft;
