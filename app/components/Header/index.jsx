/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Menu from 'components/Menu';
import { Navbar, NavbarBrand } from 'reactstrap';
import NavigationBar from 'components/NavigationBar';
import ServiceBlock from 'components/ServiceBlock';
import SearchBox from 'components/SearchBox';

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
`;

function Header(props) {
  return (
    <div id="app-header">
      <NavigationBar>
        <NavbarBrand href="/">
          <IMG src="/favicon.png" alt="OmniExplorer.info" />
          OmniExplorer.info
        </NavbarBrand>
        <div className="ml-auto w-50 d-flex">
          <div className="w-100 ml-auto d-none-only-sm-down">
            <SearchBox />
          </div>
          <Menu />
        </div>
        <div className="w-100 ml-auto d-block-only-sm-down">
          <SearchBox className="w-100"/>
        </div>
      </NavigationBar>
      <ServiceBlock />
    </div>
  );
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Header.propTypes = {};

export default Header;
