import { createGlobalStyle } from 'styled-components';
import * as vars from './styleVariables';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 10px;
    }

    body {
        margin: 0;
        font-family: ${vars.fontPrimary};
        font-size: 1.5rem;
        box-sizing: border-box;
    }

    a {
        color: ${vars.colorAccent}
    }

    h1 {
        font-size: 3.5rem;
    }

    h3, p {
        margin: 0;
        color: ${props => props.theme.secondaryTextWhite}
    }

    input {
        font-size: 1.5rem;
        color: ${props => props.theme.textColorSecondary}
    }
`;

export default GlobalStyle
