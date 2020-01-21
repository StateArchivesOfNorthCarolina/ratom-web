import React from 'react';
import styled from 'styled-components';
import { standardPadding, borderSeparator } from '../../../styles/styleVariables';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Components
import BackButton from '../../Components/Buttons/BackButton';

const MessageHeader = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const collectionsPath = pathname.split('/messages/')[0];

  return (
    <MessageHeaderStyled>
      <BackButton onClick={() => history.replace(collectionsPath)} />
    </MessageHeaderStyled>
  );
};

const MessageHeaderStyled = styled.header`
  height: 8.5rem;
  width: 100%;
  padding: ${standardPadding};
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MessageHeader;
