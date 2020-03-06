import React, { useContext } from 'react';
import styled from 'styled-components';

// Deps
import { format } from 'date-fns';

import { colorBlackLight } from '../../../styles/styleVariables';

// Context
import { MessageContext } from './MessageMain';

// Children
import Attachment from './Attachment';
import ParsedMessageBody from './ParsedMessageBody';
import { Badge } from '../Messages/Badge';

const MessageDetail = () => {
  const { message } = useContext(MessageContext);

  const formatSentDate = sentDate => {
    try {
      const date = format(new Date(sentDate), 'MMM d, yyyy');
      const time = format(new Date(sentDate), 'h:mm a');
      return { date, time };
    } catch (error) {
      console.warn('Failed to format bad date. Error: ', error);
      return { date: '', time: '' };
    }
  };

  const date = formatSentDate(message.sent_date);

  const formatDirectory = directory => {
    if (!directory) return '';
    return directory.split('/').join(' > ');
  };

  return (
    <MessageDetailStyled>
      <MessageContent>
        <MessageMeta>
          <MetaMain>
            <h4>{message.subject}</h4>
            <MetaHeader>
              <span>To: </span>
              {message.msg_to}
            </MetaHeader>
            <MetaHeader>
              <span>From: </span>
              {message.msg_from}
            </MetaHeader>
            <MessageLabels>
              {message.audit.labels.map((badge, i) => {
                let name = badge;
                if (badge.name) name = badge.name;
                return <Badge name={name} key={`${i}_${name}`} type={badge.type} />;
              })}
            </MessageLabels>
            <MessagePath>
              <h3>{formatDirectory(message.directory)}</h3>
            </MessagePath>
          </MetaMain>
          <MetaOther>
            <p>{date.date}</p>
            <p>{date.time}</p>
            <Attachments>
              {message.attachments &&
                message.attachments.map(attachment => (
                  <Attachment key={attachment.file_name} attachment={attachment} />
                ))}
            </Attachments>
          </MetaOther>
        </MessageMeta>
        <ParsedMessageBody message={message} />
      </MessageContent>
    </MessageDetailStyled>
  );
};

const MessageDetailStyled = styled.div`
  flex: 1;
  display: flex;
  overflow-y: scroll;

  padding: 3rem;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageMeta = styled.div`
  display: flex;
`;

const MetaMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const MetaOther = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  p {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const MetaHeader = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${colorBlackLight};
  line-height: 1.6;

  span {
    font-weight: bold;
  }
`;

const Attachments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const MessagePath = styled.div`
  margin: 2rem 0;
`;

const MessageLabels = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75%;
`;

export default MessageDetail;
