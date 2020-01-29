import React from 'react';
import styled from 'styled-components';

// Styles
import { borderSeparator } from '../../../../styles/styleVariables';

// Children
import AccountDetails from './AccountDetails';

const AccountsListItem = ({ account, setAccount }) => {
  return (
    <AccountsListItemStyled data-cy="accounts_list_item">
      <AccountDetails account={account} setAccount={setAccount} />
    </AccountsListItemStyled>
  );
};

const AccountsListItemStyled = styled.div`
  padding: 1.5rem 3rem;
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default AccountsListItem;
