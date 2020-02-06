import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Context
import { AccountsContext } from '../AccountsMain';

// Styles
import { borderSeparator } from '../../../../styles/styleVariables';

// Children
import AccountDetails from './AccountDetails';

const AccountsListItem = ({ account, setAccount, ...props }) => {
  const { selectAccount, setShowImportModal } = useContext(AccountsContext);
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
            selectAccount(account);
            setShowImportModal(true);
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
    <AccountsListItemStyled {...props} data-cy="accounts_list_item">
      <AccountDetails account={account} actions={buildActions()} />
    </AccountsListItemStyled>
  );
};

const AccountsListItemStyled = styled(motion.div)`
  padding: 1.5rem 3rem;
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default AccountsListItem;
