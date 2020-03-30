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
        font-family: Montserrat;
        font-size: 2rem;
        font-weight: bold;
        color: ${vars.colorBlack};
        line-height: 1.6;
    }

    h3 {
        font-family: Montserrat;
        font-size: 1.5rem;
        font-weight: bold;
        color: ${vars.colorBlackLight};
        line-height: 1.6;
        margin: 0;
    }
    
    h4 {
        font-family: Montserrat;
        font-size: 1.5rem;
        font-weight: bold;
        color: ${vars.colorBlack};
        line-height: 1.6;
    }

    h5 {
        font-family: Montserrat;
        font-size: 1.2rem;
        font-weight: bold;
        color: ${vars.colorBlack};
        line-height: 1.6;
    }

    p {
        font-family: Montserrat;
        margin: 0;
        font-size: 1.2rem;
        line-height: 1.6;
        color: ${vars.colorBlackLight};
        line-height: 1.6;
    }

    ul, li {
        font-family: Montserrat;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    button {
        font-family: Montserrat;
    }

    input, textarea {
        font-family: Montserrat;
        font-size: 1.5rem;
        color: ${vars.colorBlackLight}
    }

    /* Styles for inline html that comes from the backend */
    span.__RATOM__former-img {
        display: inline-block;
        max-width: 30rem;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        padding: .5rem;

        color: ${vars.colorBadgeRed};
        font-family: Montserrat;
        font-size: 1rem;
    }
`;

export default GlobalStyle;
