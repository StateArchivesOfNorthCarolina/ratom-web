import { createGlobalStyle } from 'styled-components';
import * as vars from './styleVariables';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        color: ${vars.colorAccentPrimary}
    }

    h1 {
        font-size: 3.5rem;
    }
`

export default GlobalStyle
