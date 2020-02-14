import React, { useContext } from 'react';
import styled from 'styled-components';

// Deps
import { useAlert } from 'react-alert';

// Context
import { AccountContext } from '../../../MessagesMain';

// Components
import Button from '../../../../../Components/Buttons/Button';
import RecordStatusWidget from '../../../../../Components/Widgets/RecordStatusWidget';

const MessageListItemContentRight = ({ message, handleSelectMessage }) => {
  const alert = useAlert();
  const { searchMessages } = useContext(AccountContext);
  const handleStatusChange = (success, _status) => {
    if (success) {
      alert.show('Message updated.', { type: 'success' });
      searchMessages();
    } else {
      alert.show('There was an error ', { type: 'error' });
    }
  };

  return (
    <ContentRight>
      <RecordStatusWidget
        messageId={message.id}
        audit={message.audit}
        afterChange={handleStatusChange}
      />
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
