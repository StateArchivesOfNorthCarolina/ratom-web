import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styles
import { borderSeparator } from '../../../../styles/styleVariables';

// Children
import AccountDetails from './AccountDetails';

const AccountsListItem = ({ account, setAccount }) => {
  const buildActions = () => {
    const actions = {
      normal: [
        {
          display: 'View',
          onClick: () => setAccount(account)
        },
        {
          display: 'Add a File',
          onClick: () => {
            /* TODO: Implement */
          }
        }
      ],
      caution: [
        {
          display: 'Remove',
          onClick: () => {
            /* TODO: Implement */
          }
        }
      ]
    };
    return actions;
  };

  return (
    <AccountsListItemStyled data-cy="accounts_list_item">
      <AccountDetails account={account} actions={buildActions()} />
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
