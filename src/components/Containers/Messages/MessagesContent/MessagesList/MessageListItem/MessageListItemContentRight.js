import React from 'react';
import styled from 'styled-components';

// Components
import Button from '../../../../../Components/Buttons/Button';

const MessageListItemContentRight = ({ handleSelectMessage }) => {
  return (
    <ContentRight>
      <ButtonStyled
        small
        neutral
        onClick={handleSelectMessage}
        data-cy="messages_list_item_view_button"
      >
        View
      </ButtonStyled>
    </ContentRight>
  );
};

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ButtonStyled = styled(Button)`
  align-self: center;
`;

export default MessageListItemContentRight;
