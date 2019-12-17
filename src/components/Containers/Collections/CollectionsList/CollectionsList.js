import React from 'react';
import styled from 'styled-components';

import { useHistory } from "react-router-dom";

// Childtren
import CollectionsListItem from './CollectionsListItem';
import AnimatedList from '../../../Components/Animated/AnimatedList';

const CollectionsList = props => {
  const history = useHistory();

  const setCollection = collection => {
    history.push(`/collections/${collection.id}`);
  }

  return (
    <CollectionsListStyled>
      {COLLECTIONS.map(collection => (
        <CollectionsListItem
          key={collection.id}
          collection={collection}
          setCollection={setCollection}
        />
      ))}
    </CollectionsListStyled>
  );
}

const CollectionsListStyled = styled(AnimatedList)``;

export default CollectionsList

// ! REMOVE vv
const COLLECTIONS = [
  {
    id: 1,
    person: "John h. Doe"
  },
  {
    id: 2,
    person: "John h. Doe"
  },
  {
    id: 3,
    person: "John h. Doe"
  },
  {
    id: 4,
    person: "John h. Doe"
  },
  {
    id: 5,
    person: "John h. Doe"
  },
  {
    id: 6,
    person: "John h. Doe"
  },
  {
    id: 7,
    person: "John h. Doe"
  }
];
