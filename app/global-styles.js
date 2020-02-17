import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    outline: none;
  }
  
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 12px;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 12px;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
  
  div.card .card-text {
	  font-family: inherit;
  }

  div.card .card-header {
	  background-color: #348FE2;
  }
  
  h1 small,h2 small,h3 small,h4 small,h5 small,h6 small {
    font-size: 60%;
    font-weight: 300;
    color: #7c7f83
  }
  
  a {
    transition: color 100ms ease-in-out;
    -o-transition: color 100ms ease-in-out;
    -ms-transition: color 100ms ease-in-out;
    -moz-transition: color 100ms ease-in-out;
    -webkit-transition: color 100ms ease-in-out;
  }
  
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    &:not(.btn){
      background-color: transparent;
    }
  }
  
  .table td, .table th {
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  
  .table th {
    font-size: 1.3rem;
    font-weight: bold;
  }
  
  .table td {
    font-size: 1.2rem;
    font-weight: 400;
  }
  
  :disabled:hover {
    cursor: not-allowed;
  }
  
  .table-responsive .table th,
  .table-responsive .table td {
  	padding-right: 0.5rem;
  	padding-left: 0.5rem;
  }
`;

export default GlobalStyle;
