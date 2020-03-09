import React, { useContext, useState } from 'react';
import styled from 'styled-components';

// Deps
import { format } from 'date-fns';

import { colorBlackLight } from '../../../styles/styleVariables';

// Axios
import Axios from '../../../services/axiosConfig';
import { UPDATE_MESSAGE } from '../../../services/requests';

// Context
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import { MessageContext } from './MessageMain';

// Children
import Attachment from './Attachment';
import ParsedMessageBody from './ParsedMessageBody';
import { Badge } from '../../Components/Labels/Badge';
import AddLabel from '../../Components/Labels/AddLabel';

const MessageDetail = () => {
  const alert = useAlert();
  const { messageId } = useParams();
  const [labelLoading, setLabelLoading] = useState(false);
  const { message, setMessage } = useContext(MessageContext);

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

  const handleAddLabel = label => {
    const data = {};
    if (label.type === 'U') data['append_user_label'] = label.name;
    setLabelLoading(true);
    Axios.put(`${UPDATE_MESSAGE}${messageId}/`, data)
      .then(response => {
        setLabelLoading(false);
        setMessage(response.data);
      })
      .catch(error => {
        console.warn('Error adding label: ', error);
        setLabelLoading(false);
        alert.error('Unable to add label, please try again');
      });
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
            <LabelsWrapper>
              <MessageLabels labelLoading={labelLoading} data-cy="message_labels_list">
                {message.audit.labels.map((badge, i) => {
                  let name = badge;
                  if (badge.name) name = badge.name;
                  return <Badge name={name} key={`${i}_${name}`} type={badge.type} />;
                })}
                <AddLabel
                  labelLoading={labelLoading}
                  currentLabels={message.audit.labels}
                  handleAddLabel={handleAddLabel}
                />
              </MessageLabels>
            </LabelsWrapper>

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

const LabelsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 75%;
`;

const MessageLabels = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-right: 1rem;

  opacity: ${props => (props.labelLoading ? 0.4 : 1)};
`;

export default MessageDetail;
