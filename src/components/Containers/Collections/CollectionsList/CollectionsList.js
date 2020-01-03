import React from 'react';
import styled from 'styled-components';

// Router
import { useHistory } from 'react-router-dom';

// AJAX
import { useQuery } from '@apollo/react-hooks';
import { MY_COLLECTIONS } from '../../../../graphql/queries/collectionQueries';

// Children
import CollectionsListItem from './CollectionsListItem';
import AnimatedList from '../../../Components/Animated/AnimatedList';
import Spinner from '../../../Components/Loading/Spinner';

const CollectionsList = props => {
  const history = useHistory();
  const { loading, error, data } = useQuery(MY_COLLECTIONS);

  const setCollection = collection => {
    history.push(`/collections/${collection.id}`);
  };

  return (
    <CollectionsListStyled>
      {loading ? (
        <Spinner />
      ) : (
        data &&
        data.myCollections.edges.map(({ node: collection }) => (
          <CollectionsListItem
            key={collection.id}
            collection={collection}
            setCollection={setCollection}
          />
        ))
      )}
    </CollectionsListStyled>
  );
};

const CollectionsListStyled = styled(AnimatedList)``;

export default CollectionsList;
