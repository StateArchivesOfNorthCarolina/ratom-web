import React from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../styles/styleVariables';

const CollectionsHeader = props => {
    return (
        <CollectionsHeaderStyled>
            <h2>My Collections</h2>
        </CollectionsHeaderStyled>
    )
}

const CollectionsHeaderStyled = styled.header`
    height: 9rem;
    width: 100%;
    padding: 1.2rem 1rem 1rem 1rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: ${borderSeparator};
`;

export default CollectionsHeader;
