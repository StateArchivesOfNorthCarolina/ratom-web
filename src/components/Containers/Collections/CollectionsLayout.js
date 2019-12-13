import React from 'react';
import styled from 'styled-components';

// Children
import CollectionsHeader from './CollectionsHeader';

const CollectionsLayout = () => {
    return (
        <CollectionsLayoutStyled>
            <CollectionsHeader />
            <h2>Collections Content</h2>
        </CollectionsLayoutStyled>
    )
}

const CollectionsLayoutStyled = styled.div`
    width: 100%;
`;

export default CollectionsLayout;
