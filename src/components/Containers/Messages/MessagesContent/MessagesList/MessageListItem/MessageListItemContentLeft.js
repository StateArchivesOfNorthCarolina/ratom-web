import React from 'react';
import styled from 'styled-components';
import MessageCheckbox from './MessageCheckbox';
import { Badge } from '../../../Badge';

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
      <Content>
        <h4>
          {message.subject} <span TEMPORARY>{message.score}</span>
        </h4>
        <InnerContent>
          <MessageMeta>
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
          </MessageMeta>
          <MessageLabels>
            {message.audit.labels.map((badge, i) => {
              let name = badge;
              if (badge.name) name = badge.name;
              return <Badge name={name} key={`${i}_${name}`} type={badge.type} />;
            })}
          </MessageLabels>
        </InnerContent>
      </Content>
    </ContentLeft>
  );
};

const ContentLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  max-height: 15rem;
  overflow-y: hidden;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h4 {
    margin: 0;
    min-width: 50%;
    /* TEMP */
    display: flex;
    flex-direction: row;
    span {
      font-size: 1rem;
      font-weight: normal;
      color: lightgrey;
    }
    /* END TEMP */
  }

  > p {
    margin: 0.5rem 0;
  }
`;

const MsgTo = styled.p`
  max-width: 50vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const InnerContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const MessageMeta = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

const MessageLabels = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 35%;
`;

export default MessageListItemContentLeft;
