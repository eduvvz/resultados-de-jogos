import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Spartan', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  html, body, #__next {
    height: 100%;
  }

  button {
    border: inherit;
    -webkit-tap-highlight-color: rgba(0,0,0,0);

    &:focus {
      outline: none;
    }
  }

  a {
    color: inherit;
    text-decoration: none
  }
`;

export default GlobalStyles;
