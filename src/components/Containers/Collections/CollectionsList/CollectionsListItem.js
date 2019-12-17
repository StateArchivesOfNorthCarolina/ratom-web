import React from 'react';
import styled from 'styled-components';

// Styles
import { standardPadding, borderSeparator } from '../../../../styles/styleVariables';

const CollectionsListItem = ({ collection, setCollection }) => {

    return (
      <CollectionsListItemStyled onClick={() => setCollection(collection)} data-cy="collections_list_item">
        <h5>{collection.person}</h5>
      </CollectionsListItemStyled>
    );
}

const CollectionsListItemStyled = styled.div`
    padding: ${standardPadding};
    border-bottom: ${borderSeparator};

    display: flex;
    flex-direction: row;
`;

export default CollectionsListItem;
