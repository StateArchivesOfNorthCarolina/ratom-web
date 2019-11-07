import React from "react";

// Styles
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import defaultTheme from "./styles/defaultTheme";

// React Router
import { Route, useParams } from "react-router-dom";

// Children
import SideBar from "./components/SideBar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import CollectionMessages from "./components/Collection/CollectionMessages";

const THEME = defaultTheme;

// Base App styles. These just came from create-react-app. You can prolly get rid of em.
const AppStyled = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  color: ${THEME.primaryTextWhite};
`;

const MainContent = styled.main`
  border: 1px solid green;
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <AppStyled>
        <SideBar />
        <MainContent>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/collection/:collectionId">
            <CollectionMessages />
          </Route>
        </MainContent>
      </AppStyled>
    </ThemeProvider>
  );
}

export default App;
