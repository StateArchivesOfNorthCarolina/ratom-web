import React from 'react';
import styled from 'styled-components';

// Children
import CollectionsHeader from './CollectionsHeader';
import CollectionsList from './CollectionsList/CollectionsList';

const CollectionsLayout = () => {
    return (
        <CollectionsLayoutStyled>
            <CollectionsHeader />
            <CollectionsList />
        </CollectionsLayoutStyled>
    )
}

const CollectionsLayoutStyled = styled.div`
    width: 100%;
`;

export default CollectionsLayout;
