import React from 'react';
import styled from 'styled-components';

// Router
import { Redirect, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Children
import CollectionsLayout from './Collections/CollectionsLayout';
import MessagesMain from './Messages/MessagesMain';
import GenericNotFound from './GenericNotFound';
import AnimatedSwitch from '../Components/Animated/AnimatedSwitch';

const ContentLayout = props => {
  return (
    <ContentLayoutStyled>
      <AnimatedSwitch>
        <PrivateRoute exact path="/">
          <CollectionsLayout />
        </PrivateRoute>

        <PrivateRoute path="/collections/:collectionId">
          <MessagesMain />
        </PrivateRoute>

        <Route path="/404">
          <GenericNotFound />
        </Route>
        <Redirect to="/404" />
      </AnimatedSwitch>
    </ContentLayoutStyled>
  );
};

const ContentLayoutStyled = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default ContentLayout;
