import { createGlobalStyle } from "styled-components";
import * as vars from "./styleVariables";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 10px;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: ${vars.fontPrimary};
        font-size: 1.5rem;
    }

    a {
        color: ${vars.colorAccent}
    }

    h1 {
        font-size: 3.5rem;
    }

    h2 {
        font-size: 2rem;
        font-weight: bold;
        color: ${props => props.theme.textColorPrimary}
    }
    
    h4 {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${props => props.theme.textColorSecondary};
    }

    h5 {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${props => props.theme.textColorSecondary};
    }

    p {
        margin: 0;
        color: ${props => props.theme.textColorPrimary}
    }

    ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    input {
        font-size: 1.5rem;
        color: ${props => props.theme.textColorSecondary}
    }
`;

export default GlobalStyle;
