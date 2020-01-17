import React from 'react';
import styled from 'styled-components';

// Axios
import { useAxios } from '../../../Hooks/useAxios';
import { listAccounts } from '../../../../services/requests';

// Router
import { useHistory } from 'react-router-dom';

// Children
import CollectionsListItem from './CollectionsListItem';
import AnimatedList from '../../../Components/Animated/AnimatedList';
import Spinner from '../../../Components/Loading/Spinner';

const CollectionsList = ({ loadingAccounts, accounts }) => {
  const history = useHistory();
  const { loading, error, data } = useAxios(listAccounts);

  const setAccount = collection => {
    history.push(`/collections/${collection.id}`);
  };

  return (
    <CollectionsListStyled>
      {loadingAccounts ? (
        <Spinner />
      ) : (
        data &&
        data.map(account => (
          <CollectionsListItem key={account.id} collection={account} setCollection={setAccount} />
        ))
      )}
    </CollectionsListStyled>
  );
};

const CollectionsListStyled = styled(AnimatedList)``;

export default CollectionsList;
