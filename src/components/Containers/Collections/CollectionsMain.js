import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// GraphQL
import { useLazyAxios } from '../../Hooks/useAxios';
// import { POLLING_INTERVAL } from '../../../constants/applicationConstants';

// Children
import CollectionsHeader from './CollectionsHeader';
import CollectionsList from './CollectionsList/CollectionsList';
import AccountImportModal from './AccountImportModal';
import { useAlert } from 'react-alert';
import { listAccounts } from '../../../services/requests';

const CollectionsMain = () => {
  const alert = useAlert();
  const [showImportModal, setShowImportModal] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const [loadAccounts, { loading: loadingAccounts, error: accountsError }] = useLazyAxios(
    listAccounts,
    {
      onCompleted(data) {
        setAccounts(data.myCollections.edges);
        // if (any of the accounts have import_status of anything but "complete" or "complete_read") {
        //    startImportStatusPolling();
        // }
      }
    }
  );

  const [startImportStatusPolling, { error: pollingError }] = useLazyAxios('', {
    // pollInterval: POLLING_INTERVAL,
    // onCompleted(data) {
    //   // TODO: update accounts with their status
    //   // this query should return a list of accounts (still filtered by user-access)
    //   // that have import_status of anything but "complete_read"
    //   // here we need to update accounts in state accordingly
    // },
    // onError(error) {
    //   // This is an error getting information about import status, NOT an import error itself.
    //   alert.show('An error occured while trying to update import status of ?.', {
    //     type: 'error'
    //   });
    // }
  });

  useEffect(() => {
    // This catches both the mounting of the component
    // And the closing of the importModal
    if (showImportModal === false) {
      loadAccounts();
    }
  }, [loadAccounts, showImportModal]);

  return (
    <CollectionsMainStyled>
      <CollectionsHeader openImportModal={() => setShowImportModal(true)} />
      <CollectionsList accounts={accounts} loadingAccounts={loadingAccounts} />
      <AccountImportModal
        isVisible={showImportModal}
        closeModal={() => setShowImportModal(false)}
      />
    </CollectionsMainStyled>
  );
};

const CollectionsMainStyled = styled.div`
  width: 100%;
`;

export default CollectionsMain;
