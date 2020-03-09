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

// Children
import MainLayout from './components/Containers/Main/MainLayout';
import Alert from './components/Components/Alert';
import { ALERT_TIMEOUT } from './constants/applicationConstants';

const THEME = defaultTheme;

const App = () => {
  return (
    // Pancakes anybody?
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <BrowserRouter>
        <AlertProvider template={Alert} {...alertOptions}>
          <AuthProvider>
            <AppStyled>
              <PrivateRoute path="/" component={MainLayout} />
            </AppStyled>
          </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const AppStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
`;
const alertOptions = {
  timeout: ALERT_TIMEOUT,
  position: positions.TOP_CENTER,
  transitions: transitions.FADE,
  containerStyle: { zIndex: 1001 }
};

export default App;
