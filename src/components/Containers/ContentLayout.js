import React from 'react';
import styled from 'styled-components';

// Router
import PrivateRoute from './PrivateRoute';

// Children
import CollectionsLayout from "./Collections/CollectionsLayout";
import MessagesMain from "./Messages/MessagesMain";


const ContentLayout = props => {
    return (
        <ContentLayoutStyled>
            <PrivateRoute exact path="/" component={CollectionsLayout}/>
            <PrivateRoute path="/collections/:collectionId" component={MessagesMain} />
        </ContentLayoutStyled>
    )
}

const ContentLayoutStyled = styled.main`
    width: 100%;
`;

export default ContentLayout;
