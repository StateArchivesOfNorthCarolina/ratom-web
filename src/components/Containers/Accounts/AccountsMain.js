import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';

// Axios
import Axios from '../../../services/axiosConfig';

// Children
import AccountsHeader from './AccountsHeader';
import AccountsList from './AccountsList/AccountsList';
import AccountImportModal from './AccountImportModal';
import { LIST_ACCOUNTS } from '../../../services/requests';

export const AccountsContext = createContext();

const AccountsMain = () => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountSelected, setAccountSelected] = useState();

  const loadAccounts = () => {
    setLoading(true);
    Axios.get(LIST_ACCOUNTS)
      .then(response => {
        setLoading(false);
        setAccounts(response.data);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // This catches both the mounting of the component
    // And the closing of the importModal
    if (showImportModal === false) {
      loadAccounts();
    }
  }, [showImportModal]);

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
        <AccountsList accounts={accounts} loadingAccounts={loading} />
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
