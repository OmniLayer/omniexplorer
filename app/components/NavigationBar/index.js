/**
 *
 * NavigationBar
 *
 */

import React from 'react';
import { Navbar } from 'reactstrap';
import styled from 'styled-components';

const StyledNavigationBar = styled(Navbar).attrs({
  className: 'navigation-bar',
})`
  background-color: #3498db;
  a,
  a.nav-link {
    color: white;
  }
  .dropdown-item a {
    color: #1c347a;
  }
`;

export default StyledNavigationBar;
