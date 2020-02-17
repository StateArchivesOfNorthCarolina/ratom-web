import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Axios from '../../../../services/axiosConfig';
import { RESTART_FILE } from '../../../../services/requests';
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
      caution: [
        {
          display: 'Remove',
          onClick: () => {
            /* TODO: Implement */
          }
        }
      ]
    };

    if (account.account_status === 'FA') {
      actions.caution.push({
        display: 'Restart',
        onClick: () => {
          selectAccount(account);
          _updateFile(account);
        }
      });
    }
    return actions;
  };

  const _updateFile = account => {
    Axios.post(RESTART_FILE, account)
      .then(response => {
        alert.success('The failed file has been restarted');
      })
      .catch(error => {
        alert.error('An error occurred while trying to add a file to this account.');
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
