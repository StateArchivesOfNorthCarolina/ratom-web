import React from 'react';
import styled from 'styled-components';

// Router
import { useHistory } from 'react-router-dom';

// Children
import CollectionsListItem from './CollectionsListItem';
import AnimatedList from '../../../Components/Animated/AnimatedList';
import Spinner from '../../../Components/Loading/Spinner';

const CollectionsList = ({ loadingAccounts, accounts }) => {
  const history = useHistory();

  const setAccount = collection => {
    history.push(`/collections/${collection.id}`);
  };

  return (
    <CollectionsListStyled>
      {loadingAccounts ? (
        <Spinner />
      ) : (
        accounts.map(account => (
          <CollectionsListItem key={account.id} collection={account} setCollection={setAccount} />
        ))
      )}
    </CollectionsListStyled>
  );
};

const CollectionsListStyled = styled(AnimatedList)``;

export default CollectionsList;
