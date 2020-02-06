import React from 'react';
import styled from 'styled-components';

// Components
import Button from '../../../../../Components/Buttons/Button';
import RecordStatusWidget from '../../../../../Components/Widgets/RecordStatusWidget';

const MessageListItemContentRight = ({ handleSelectMessage }) => {
  return (
    <ContentRight>
      <RecordStatusWidget value={'open_record'} onChange={() => {}} />
      <ButtonStyled neutral onClick={handleSelectMessage} data-cy="messages_list_item_view_button">
        View
      </ButtonStyled>
    </ContentRight>
  );
};

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
`;

const ButtonStyled = styled(Button)`
  margin-left: 4rem;
`;

export default MessageListItemContentRight;
