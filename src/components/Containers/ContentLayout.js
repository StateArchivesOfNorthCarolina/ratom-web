import React from 'react';
import styled from 'styled-components';

// Router
import { Switch, Redirect, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Children
import CollectionsLayout from "./Collections/CollectionsLayout";
import MessagesMain from "./Messages/MessagesMain";
import GenericNotFound from './GenericNotFound';


const ContentLayout = props => {
    return (
      <ContentLayoutStyled>
        <Switch>
          <PrivateRoute exact path="/">
            <CollectionsLayout />
          </PrivateRoute>
          
          <PrivateRoute path="/collections/:collectionId" >
            <MessagesMain />
          </PrivateRoute>

          <Route path="/404">
              <GenericNotFound />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </ContentLayoutStyled>
    );
}

const ContentLayoutStyled = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default ContentLayout;
