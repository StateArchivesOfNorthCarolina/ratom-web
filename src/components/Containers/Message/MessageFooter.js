import React from 'react';
import styled from 'styled-components';
import { standardPadding, borderSeparator } from '../../../styles/styleVariables';
import MessageStepper from './MessageStepper';

const MessageFooter = () => {
  return (
    <MessageFooterStyled>
      <ContentWrapper>
        <MessageStepper />
      </ContentWrapper>
    </MessageFooterStyled>
  );
};

const MessageFooterStyled = styled.footer`
  height: 8.5rem;
  width: 100%;
  padding: ${standardPadding};
  border-top: ${borderSeparator};

  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
`;

export default MessageFooter;
