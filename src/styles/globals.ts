import { createGlobalStyle } from 'styled-components';

import InterRegularWoff from './fonts/Inter-Regular.woff';
import InterRegularWoff2 from './fonts/Inter-Regular.woff2';
import InterExtraBoldWoff from './fonts/Inter-ExtraBold.woff';
import InterExtraBoldWoff2 from './fonts/Inter-ExtraBold.woff2';

import { colors } from './colors';

const Globals = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url(${InterRegularWoff2}) format('woff2'),
        url(${InterRegularWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
      font-family: 'Inter';
      src: url(${InterExtraBoldWoff2}) format('woff2'),
          url(${InterExtraBoldWoff}) format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }

  body {
    line-height: 1.375;
    color: ${colors.black};
    background: ${colors.white};
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    //transition: color .15s ease-in-out, background .15s ease-in-out;
  }
  
  .print {
    display: none;
  }
  
  @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
    
    body {
      padding: 30px;
      text-align: left;
    }
    
    .print {
      display: block;
    }
  }


  #root {
    width: 100%;
    height: 100%;
  }
  
  #root > #animate {
    position: absolute;
    width: 100%;
    height: 100%;
    will-change: transform, opacity;
  }
  
  button {
    padding: 0;
    cursor: pointer;
  
    &:focus {
      outline: none;
    }
  }
  
  input {
    &:focus {
      outline: none
    }
  }
  
  a {
    color: ${colors.blue};
    text-decoration: none;
  }
  
  .ReactCollapse--collapse {
    transition: height ease-in 250ms;
  }
`;

export default Globals;
