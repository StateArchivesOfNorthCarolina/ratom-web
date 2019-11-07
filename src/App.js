import React from 'react';

// Styles
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import defaultTheme from './styles/defaultTheme';
import { colorWhite } from './styles/styleVariables';


// Base App styles. These just came from create-react-app. You can prolly get rid of em.
const AppStyled = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colorWhite};
`




function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AppStyled >
        <h1>A tabula rasa in omnia errorum tua</h1>
      </AppStyled>
    </ThemeProvider>
  );
}

export default App;
