import React, { useState } from "react";

// Styles
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import defaultTheme from "./styles/defaultTheme";

// React Router
import { Route } from "react-router-dom";

// Children
import SideBar from "./components/SideBar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import CollectionMessages from "./components/Collection/CollectionMessages";
import AppContext from "./components/app-state";
import MessageDetail from "./components/Message/MessageDetail";

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
  const [collections, setCollections] = useState([]);
  const [currentCollection, setCurrentCollection] = useState();
  const [messages, setMessages] = useState([]);
  const [currentMessageId, setCurrentMessageId] = useState();

  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <AppStyled>
        <AppContext.Provider
          value={{
            collections,
            setCollections,
            currentCollection,
            setCurrentCollection,
            messages,
            setMessages,
            currentMessageId,
            setCurrentMessageId
          }}
        >
          <SideBar />
          <MainContent>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route exact path="/collection/:collectionId">
              <CollectionMessages />
            </Route>

            <Route path="/collection/:collectionId/message/:messageId">
              <MessageDetail />
            </Route>
          </MainContent>
        </AppContext.Provider>
      </AppStyled>
    </ThemeProvider>
  );
}

export default App;
