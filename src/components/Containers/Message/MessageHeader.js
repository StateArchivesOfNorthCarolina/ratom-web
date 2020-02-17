import React, { useContext } from 'react';
import styled from 'styled-components';
import { standardPadding, borderSeparator } from '../../../styles/styleVariables';

// Deps
import { useAlert } from 'react-alert';

// Context
import { MessageContext } from './MessageMain';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Components
import BackButton from '../../Components/Buttons/BackButton';
import MessageStepper from './MessageStepper';
import RecordStatusWidget from '../../Components/Widgets/RecordStatusWidget';

const MessageHeader = () => {
  const alert = useAlert();
  const { message } = useContext(MessageContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const handleStatusChange = (success, _status) => {
    if (success) {
      alert.show('Message updated.', { type: 'success' });
    } else {
      alert.show('There was an error ', { type: 'error' });
    }
  };

  return (
    <MessageHeaderStyled>
      <ContentLeft>
        <BackButton
          onClick={() => history.replace(pathname.split('/messages')[0], { reset: true })}
        />
      </ContentLeft>
      <ContentCenter>
        <MessageStepper />
      </ContentCenter>
      <ContentRight>
        <RecordStatusWidget
          messageId={message.id}
          audit={message.audit}
          afterChange={handleStatusChange}
        />
      </ContentRight>
    </MessageHeaderStyled>
  );
};

const MessageHeaderStyled = styled.header`
  position: relative;

  height: 8.5rem;
  width: 100%;
  padding: ${standardPadding};
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ContentLeft = styled.div`
  position: absolute;
  left: 3rem;
`;

const ContentCenter = styled.div``;

const ContentRight = styled.div`
  position: absolute;
  right: 3rem;
`;

export default MessageHeader;
