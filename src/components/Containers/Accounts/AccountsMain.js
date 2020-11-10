import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';

import { useAlert } from 'react-alert';
// Axios
import Axios from '../../../services/axiosConfig';
import { LIST_ACCOUNTS } from '../../../services/requests';

// Children
import AccountsHeader from './AccountsHeader';
import AccountsList from './AccountsList/AccountsList';
import AccountImportModal from './AccountImportModal';

export const AccountsContext = createContext();

const AccountsMain = () => {
  const alert = useAlert();
  const [showImportModal, setShowImportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState();
  const [accountSelected, setAccountSelected] = useState();
  const [accountModified, setAccountModified] = useState(false);

  const loadAccounts = () => {
    setLoading(true);
    Axios.get(LIST_ACCOUNTS)
      .then(response => {
        setLoading(false);
        setAccounts(response.data);
      })
      .catch(error => {
        console.error(error);
        alert.error('Could not get accounts. Please refresh.');
        setLoading(false);
      });
  };

  useEffect(() => {
    // This catches both the mounting of the component
    // And the closing of the importModal
    if (showImportModal === false || accountModified) {
      loadAccounts();
    }
  }, [showImportModal, accountModified]);

  const selectAccount = newAccountSelected => {
    setAccountSelected(newAccountSelected);
  };

  const accountsContext = {
    accountSelected,
    selectAccount,
    setShowImportModal
  };

  return (
    <AccountsMainStyled>
      <AccountsContext.Provider value={accountsContext}>
        <AccountsHeader openImportModal={() => setShowImportModal(true)} />
        <AccountsList
          accounts={accounts}
          setAccountModified={setAccountModified}
          loadingAccounts={loading}
        />
        <AccountImportModal
          isVisible={showImportModal}
          closeModal={() => setShowImportModal(false)}
        />
      </AccountsContext.Provider>
    </AccountsMainStyled>
  );
};

const AccountsMainStyled = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

export default AccountsMain;
