import { createGlobalStyle } from 'styled-components';
import * as vars from './styleVariables';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    a {
        color: ${vars.colorAccentPrimary}
    }

    h1 {
        font-size: 3.5rem;
    }

    h3, p {
        font-family: 'Roboto Mono', monospace;
        padding: 0;
        margin: 0;
        color: ${props => props.theme.secondaryTextWhite}
    }

    nav {
        text-align: center;
    }
`

export default GlobalStyle
