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
  fixed: 'top',
  fluid: 'true',
  color: 'light',
})`
  background-color: #1c347a;
  background-image: linear-gradient(180deg, #192d69 -2%, #192d69 0%, #1c347a);

  a,
  a.nav-link {
    color: white;
  }
  .dropdown-item a {
    color: #1c347a;
  }
`;

export default StyledNavigationBar;
