/**
 *
 * NavigationBar
 *
 */

import React from 'react';
import { Navbar } from 'reactstrap';
import styled from 'styled-components';

const StyledNavigationBar = styled(Navbar).attrs({
  expand: 'sm',
  className: 'd-block',
  fluid: 'true',
  color: 'light',
})`
  background-color: #3498db;
  background-image: linear-gradient(180deg, #3498db -2%, #3498db 0%, #3498db);
  z-index: 999 !important;

  a,
  a.nav-link {
    color: white;
  }
  .dropdown-item a {
    color: #1c347a;
  }
`;

export default StyledNavigationBar;
