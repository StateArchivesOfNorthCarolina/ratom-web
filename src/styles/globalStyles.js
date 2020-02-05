import { createGlobalStyle } from 'styled-components';
import * as vars from './styleVariables';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 10px;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Montserrat;
        font-size: 1.5rem;
    }

    a {
        color: ${vars.colorAccent}
    }

    h1 {
        font-family: Montserrat;
        font-size: 2.6rem;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.54;
        letter-spacing: normal;
        color: #212121;
    }

    h2 {
        font-size: 2rem;
        font-weight: bold;
        color: ${props => props.theme.textColorPrimary};
        line-height: 1.6;
    }

    h3 {
        line-height: 1.6;
    }
    
    h4 {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${props => props.theme.textColorPrimary};
        line-height: 1.6;
    }

    h5 {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${props => props.theme.textColorPrimary};
        line-height: 1.6;
    }

    p {
        margin: 0;
        font-size: 1.2rem;
        line-height: 1.6;
        color: ${props => props.theme.textColorSecondary};
        line-height: 1.6;
    }

    ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    input, textarea {
        font-size: 1.5rem;
        color: ${props => props.theme.textColorSecondary}
    }
`;

export default GlobalStyle;
