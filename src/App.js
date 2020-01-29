import React from 'react';

// Styles
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import defaultTheme from './styles/defaultTheme';

// Router
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/Containers/PrivateRoute';

// Context
import AuthProvider from './components/Context/auth-provider';

// Children
import MainLayout from './components/Containers/Main/MainLayout';

const THEME = defaultTheme;

const AppStyled = styled.div`
  /* min-height: 100vh; */
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    // Pancakes anybody?
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <AppStyled>
            <PrivateRoute path="/" component={MainLayout} />
          </AppStyled>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
