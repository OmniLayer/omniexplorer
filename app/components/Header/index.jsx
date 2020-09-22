/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SearchBox from 'components/SearchBox';
import NavigationBar from 'components/NavigationBar';
import { ECOSYSTEM_PROD_NAME, ECOSYSTEM_TEST_NAME, EXODUS_TXS_CLASS_AB } from 'containers/App/constants';
// import { slide as Menu } from 'react-burger-menu';
import { push as Menu } from 'react-burger-menu';
// import Menu from 'react-burger-menu/lib/menus/slide';
import './sidebar.css';

import {
  Alert,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Button,
  UncontrolledCollapse,
  Card,
  CardBody,
} from 'reactstrap';
import ServiceBlock from 'components/ServiceBlock';
import getLocationPath, {getSufixURL} from 'utils/getLocationPath';

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
`;

const StyledNavigationBar = styled(NavigationBar)`
  padding-left: 3rem !important;
  min-height: 3rem;
`;

const StyledNavItem = styled(NavItem)`
  font-size: 16px;
`;

const StyledCollapse = styled(Collapse)`
  font-size: 16px;
`;

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = (e)  => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Menu customBurgerIcon={ <img src="/favicon.png" alt="OMNIEXPLORER.INFO" />} outerContainerId={ "app-container" } pageWrapId={ "app-container" } >
          <NavLink href="/">Home</NavLink>
          <div>
            <DropdownToggle nav caret id="api-toggler">
              API
            </DropdownToggle>
            <UncontrolledCollapse toggler="#api-toggler">
              <DropdownItem>
                <NavLink href="https://api.omniexplorer.info">Documentation</NavLink>
              </DropdownItem>
            </UncontrolledCollapse>
          </div>
          <div>
            <DropdownToggle nav caret id="prop-list-toggler">
              Property List
            </DropdownToggle>
            <UncontrolledCollapse toggler="#prop-list-toggler">
              <DropdownItem>
                <NavLink href={`${getSufixURL()}/properties/${ECOSYSTEM_PROD_NAME.toLowerCase()}`} >Production</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href={`${getSufixURL()}/properties/${ECOSYSTEM_TEST_NAME.toLowerCase()}`} >Test</NavLink>
              </DropdownItem>
            </UncontrolledCollapse>
          </div>
          <div>
            <DropdownToggle nav caret id="crowdsales-toggler">
              Crowdsales
            </DropdownToggle>
            <UncontrolledCollapse toggler="#crowdsales-toggler">
              <DropdownItem>
                <NavLink href={`${getSufixURL()}/crowdsales/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}>Production</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href={`${getSufixURL()}/crowdsales/${ECOSYSTEM_TEST_NAME.toLowerCase()}`}>Test</NavLink>
              </DropdownItem>
            </UncontrolledCollapse>
          </div>
          <div>
            <DropdownToggle nav caret id="misc-toggler">
              Misc
            </DropdownToggle>
            <UncontrolledCollapse toggler="#misc-toggler">
              {/*<DropdownItem>*/}
              {/*  <NavLink href="/exchange">Exchange</NavLink>*/}
              {/*</DropdownItem>*/}
              <DropdownItem>
                <NavLink href="/testnet/">Testnet</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href={`/${EXODUS_TXS_CLASS_AB}`}>Recent Class A/B TX's</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href={`${getSufixURL()}/activations`}>Feature Activations</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="http://www.omnilayer.org/#GetStarted" target="_blank">Wallets</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="https://github.com/OmniLayer/omniexplorer/wiki/OmniExplorer-FAQ" target="_blank">Help/FAQ</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="https://github.com/OmniLayer/omniexplorer/issues" target="_blank">Report Bug</NavLink>
              </DropdownItem>
              {/*<DropdownItem>*/}
              {/*  <NavLink href="/analytics">Analytics</NavLink>*/}
              {/*</DropdownItem>*/}
            </UncontrolledCollapse>
          </div>
        </Menu>
        <StyledNavigationBar fixed="top">
          <div className="d-flex">
            <NavbarBrand href="/">
              OMNIEXPLORER.INFO
            </NavbarBrand>
            <div className="ml-auto w-50 d-flex">
              <div className="w-100 ml-auto d-none-only-sm-down">
                <SearchBox />
              </div>
              <NavbarToggler onClick={this.toggle} />
            </div>
          </div>
        </StyledNavigationBar>
        <ServiceBlock />
      </div>
    );
  }
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

NavbarToggler.propTypes = {
  type: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, )(Header);
