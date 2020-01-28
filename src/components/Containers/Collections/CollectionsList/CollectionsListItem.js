import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { darken } from '../../../../styles/styleUtils/lighten-darken';

// Children
import CollectionsListItemDetail from './CollectionsListItemDetail';

// Styles
import { standardPadding, borderSeparator } from '../../../../styles/styleVariables';

export const IconTextStack = ({ icon, item }) => {
  return (
    <>
      <IconStyled icon={icon} /> {item}
    </>
  );
};

const CollectionsListItem = ({ collection, setCollection }) => {
  console.log('collection: ', collection);
  return (
    <CollectionsListItemStyled
      onClick={() => setCollection(collection)}
      data-cy="collections_list_item"
    >
      <LeftContent>
        <h5>{collection.title}</h5>
        <p></p>
      </LeftContent>

      <RightContent>
        <MessageCounts>
          <IconTextStack icon={faEnvelope} item={collection.messages_in_account} />
          <p />
          <IconTextStack icon={faFileAlt} item={collection.files_in_account} />
        </MessageCounts>

        <ProcessingStatus>
          Unprocessed{' '}
          {parseInt(collection.messages_in_account) - parseInt(collection.processed_messages)}
          <p />
          Modified Date {collection.message_last_modified}
        </ProcessingStatus>
        <p>...</p>
      </RightContent>

      {/* 
      <CollectionsListItemDetail files={collection.files} /> */}
    </CollectionsListItemStyled>
  );
};

const CollectionsListItemStyled = styled.div`
  padding: ${standardPadding};
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
`;

const MessageCounts = styled.div`
  padding: 2rem;
  margin-right: 8rem;
  font-weight: lighter;
  color: ${props => props.theme.textColorDark};
  align-content: center;
`;

const ProcessingStatus = styled.div`
  padding: 1rem;
  margin-right: 8rem;
  width: 60%;
`;

const IconStyled = styled(FontAwesomeIcon)`
  color: ${props => props.theme.textColorDark};
  font-weight: bold;
  margin-left: 1rem;
`;

export default CollectionsListItem;
