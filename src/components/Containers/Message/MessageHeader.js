import React from 'react';
import styled from 'styled-components';
import { standardPadding, borderSeparator } from '../../../styles/styleVariables';

// Router
import { useHistory } from 'react-router-dom';

// Components
import BackButton from '../../Components/Buttons/BackButton';
import MessageStepper from './MessageStepper';
import RecordStatusWidget from '../../Components/Widgets/RecordStatusWidget';

const MessageHeader = () => {
  const history = useHistory();
  return (
    <MessageHeaderStyled>
      <ContentLeft>
        <BackButton onClick={() => history.goBack()} />
      </ContentLeft>
      <ContentCenter>
        <MessageStepper />
      </ContentCenter>
      <ContentRight>
        <RecordStatusWidget value={'open_record'} onChange={() => {}} />
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
