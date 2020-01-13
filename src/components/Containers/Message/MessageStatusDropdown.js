import React from 'react';
import styled from 'styled-components';

const MessageStatusDropdown = props => {
  return (
    <MessageStatusDropdownStyled>
      <p>MessageStatusDropdown</p>
    </MessageStatusDropdownStyled>
  );
};

const MessageStatusDropdownStyled = styled.div`
  position: absolute;
  right: 5rem;
`;

export default MessageStatusDropdown;
