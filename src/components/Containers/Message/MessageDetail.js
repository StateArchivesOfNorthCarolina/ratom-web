import React, { useContext } from 'react';
import styled from 'styled-components';

// Context
import { MessageContext } from './MessageMain';
import { format } from 'date-fns';
import {
  colorGrey,
  colorBlack,
  colorPrimary,
  colorBlackLight
} from '../../../styles/styleVariables';
import Attachment from './Attachment';

const MessageDetail = () => {
  const { message } = useContext(MessageContext);

  const formatSentDate = sent_date => {
    try {
      const date = format(new Date(sent_date), 'MMM d, yyyy');
      const time = format(new Date(sent_date), 'h:mm a');
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
            <h3>{message.subject}</h3>
            <p>
              <span>To: </span>
              {message.msg_to}
            </p>
            <p>
              <span>From: </span>
              {message.msg_from}
            </p>
            <h3>[Message Tags Go Here]</h3>
            <MessagePath>
              <h3>{formatDirectory(message.directory)}</h3>
            </MessagePath>
          </MetaMain>
          <MetaOther>
            <p>{date.date}</p>
            <p>{date.time}</p>
            <Attachments>
              {message.attachments.map(attachment => (
                <Attachment key={attachment.file_name} attachment={attachment} />
              ))}
            </Attachments>
          </MetaOther>
        </MessageMeta>

        <MessageBody>
          <MessageBodyStart>START MESSAGE BODY</MessageBodyStart>
          {/* //! TEMPORARY */}
          <BodyContent dangerouslySetInnerHTML={{ __html: message.body }}></BodyContent>
          {/* //! END TEMPORARY */}
          <MessageBodyEnd>END MESSAGE BODY</MessageBodyEnd>
        </MessageBody>
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

  p,
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p span {
    color: ${colorBlackLight};
    font-weight: bold;
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

const Attachments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const MessagePath = styled.div`
  margin: 2rem 0;
`;
const MessageBody = styled.div``;

const BodyContent = styled.div`
  padding: 0 2rem;
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

export default MessageDetail;
