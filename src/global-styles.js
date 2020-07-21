import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  * {
  box-sizing: border-box;
}

body{
  //width: 500px;
  width: 396px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
 
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .selected {
    color: #fff;
  }
 
`;

export default GlobalStyle;
