import React  from "react";

// Styles
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import defaultTheme from "./styles/defaultTheme";

// Router
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/Containers/PrivateRoute";

// Context
import AuthProvider from "./components/Context/auth-provider";
import Main from "./components/Containers/Main";


const THEME = defaultTheme;

const AppStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
`;

const App = () => {
  return (
    // Pancakes anybody?
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <AppStyled>
            <PrivateRoute path="/" component={Main}/>
          </AppStyled>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
