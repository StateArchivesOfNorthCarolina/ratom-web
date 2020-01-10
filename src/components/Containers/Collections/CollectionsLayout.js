import React, { useState } from 'react';
import styled from 'styled-components';

// Children
import CollectionsHeader from './CollectionsHeader';
import CollectionsList from './CollectionsList/CollectionsList';
import AccountImportModal from './AccountImportModal';

const CollectionsLayout = () => {
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <CollectionsLayoutStyled>
      <CollectionsHeader openImportModal={() => setShowImportModal(true)} />
      <CollectionsList />
      <AccountImportModal
        isVisible={showImportModal}
        closeModal={() => setShowImportModal(false)}
      />
    </CollectionsLayoutStyled>
  );
};

const CollectionsLayoutStyled = styled.div`
  width: 100%;
`;

export default CollectionsLayout;
