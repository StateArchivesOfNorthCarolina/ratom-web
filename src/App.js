import React from "react";

// Styles
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import defaultTheme from "./styles/defaultTheme";



const THEME = defaultTheme;

// Base App styles. These just came from create-react-app. You can prolly get rid of em.
const AppStyled = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  color: ${THEME.primaryTextWhite};
`;

// const MainContent = styled.main`
//   border: 1px solid green;
//   width: 100%;
// `;

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <AppStyled>

        <h1>RATOM tho</h1>

      </AppStyled>
    </ThemeProvider>
  );
}

export default App;
