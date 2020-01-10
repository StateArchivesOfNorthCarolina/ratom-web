import React from 'react';
import styled from 'styled-components';

// Styles
import { standardPadding, borderSeparator } from '../../../../styles/styleVariables';

const CollectionsListItem = ({ account, setAccount }) => {
  // let importStatus;

  return (
    <CollectionsListItemStyled onClick={() => setAccount(account)} data-cy="collections_list_item">
      <LeftContent>
        <div>
          <h5>{account.title}</h5>
          <p>{account.accessionDate}</p>
        </div>
        <div>
          {/* TODO: probably create an ImportBadge component, can't reuse Badge as is. */}
          {/* <ImportBadge status={importStatus} status={importStatus} /> */}
        </div>
      </LeftContent>
      <RightContent>
        <p>other stuff</p>
      </RightContent>
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
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
  }
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
  }
`;

export default CollectionsListItem;
