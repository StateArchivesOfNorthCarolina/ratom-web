import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Axios from '../../../../services/axiosConfig';
import { DELETE_FILE } from '../../../../services/requests';
import { useAlert } from 'react-alert';

// Context
import { AccountsContext } from '../AccountsMain';

// Styles
import { borderSeparator } from '../../../../styles/styleVariables';

// Children
import AccountDetails from './AccountDetails';

const AccountsListItem = ({ account, setAccount, ...props }) => {
  const { selectAccount, setShowImportModal } = useContext(AccountsContext);
  const alert = useAlert();
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
      caution: []
    };

    if (account.account_status === 'FA') {
      let displayMsg = 'Restore Account';
      if (account.files_in_account === 1) {
        displayMsg = 'Remove Account';
      }
      actions['normal'] = [];
      actions.caution.push({
        display: displayMsg,
        onClick: () => {
          selectAccount(account);
          _deleteFile(account);
        }
      });
    }
    return actions;
  };

  const _deleteFile = account => {
    Axios.delete(DELETE_FILE, { data: account })
      .then(response => {
        alert.success('The account has been restored or removed.');
      })
      .catch(error => {
        alert.error('An error occurred while trying to restore this account.');
      });
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
