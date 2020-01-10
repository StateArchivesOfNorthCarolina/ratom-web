import React from 'react';

// Styles
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import defaultTheme from './styles/defaultTheme';

// Deps
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

// Router
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/Containers/PrivateRoute';

// Context
import AuthProvider from './components/Context/auth-provider';
import ApolloProvider from './graphql/ApolloConfig';

// Children
import MainLayout from './components/Containers/Main/MainLayout';
import Alert from './components/Components/Alert';
import { ALERT_TIMEOUT } from './constants/applicationConstants';

const THEME = defaultTheme;

const AppStyled = styled.div`
  /* min-height: 100vh; */
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const alertOptions = {
  timeout: ALERT_TIMEOUT,
  position: positions.TOP_CENTER,
  transitions: transitions.FADE,
  containerStyle: { top: '7rem' }
};

const App = () => {
  return (
    // Pancakes anybody?
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <BrowserRouter>
        <AlertProvider template={Alert} {...alertOptions}>
          <AuthProvider>
            <ApolloProvider>
              <AppStyled>
                <PrivateRoute path="/" component={MainLayout} />
              </AppStyled>
            </ApolloProvider>
          </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
