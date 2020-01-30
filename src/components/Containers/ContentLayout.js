import React from 'react';
import styled from 'styled-components';

// Router
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Children
import AccountsLayout from './Accounts/AccountsLayout';
import MessagesMain from './Messages/MessagesMain';
import GenericNotFound from './GenericNotFound';
// import AnimatedSwitch from '../Components/Animated/AnimatedSwitch';

const ContentLayout = props => {
  return (
    <ContentLayoutStyled>
      {/* <AnimatedSwitch> */}
      <Switch>
        <PrivateRoute exact path="/">
          <AccountsLayout />
        </PrivateRoute>

        <PrivateRoute path="/accounts/:accountId">
          <MessagesMain />
        </PrivateRoute>

        <Route path="/404">
          <GenericNotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>
      {/* </AnimatedSwitch> */}
    </ContentLayoutStyled>
  );
};

const ContentLayoutStyled = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default ContentLayout;
