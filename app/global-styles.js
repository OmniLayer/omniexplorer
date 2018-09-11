import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 no-tabs: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 12px;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
   
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
    -webkit-transition: color 100ms ease-in-out
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
  
  @include media-breakpoint-down(sm) {
  
  }
  
  :disabled:hover {
    cursor: not-allowed;
  }
`;
