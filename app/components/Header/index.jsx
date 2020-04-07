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
import { ECOSYSTEM_PROD_NAME, ECOSYSTEM_TEST_NAME } from 'containers/App/constants';

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
} from 'reactstrap';

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
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
        <Navbar color="faded" light expand="sm" className="d-block">
          <div className="d-flex">
            <NavbarBrand href="/">
              <IMG src="/favicon.png" alt="OMNIEXPLORER.INFO" />
              OMNIEXPLORER.INFO
            </NavbarBrand>
            <div className="ml-auto w-50 d-flex">
              <div className="w-100 ml-auto d-none-only-sm-down">
                <SearchBox />
              </div>
              <NavbarToggler onClick={this.toggle} />
            </div>
          </div>
          <div className="d-flex">
            <StyledCollapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="ml-auto">
                <StyledNavItem>
                  <NavLink href="/">Home</NavLink>
                </StyledNavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    API
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="https://api.omniexplorer.info">Documentation</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Property List
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href={`/properties/${ECOSYSTEM_PROD_NAME.toLowerCase()}`} >Production</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={`/properties/${ECOSYSTEM_TEST_NAME.toLowerCase()}`} >Test</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Crowdsales
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href={`/crowdsales/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}>Production</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={`/crowdsales/${ECOSYSTEM_TEST_NAME.toLowerCase()}`}>Test</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Misc
                  </DropdownToggle>
                  <DropdownMenu right>
                    {/*<DropdownItem>*/}
                    {/*  <NavLink href="/exchange">Exchange</NavLink>*/}
                    {/*</DropdownItem>*/}
                    <DropdownItem>
                      <NavLink href="/activations">Feature Activations</NavLink>
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
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </StyledCollapse>
          </div>
        </Navbar>
        <div className="w-100 ml-auto d-block-only-sm-down">
          <SearchBox />
        </div>
        <div className="w-100 ml-auto d-block-only-sm-down d-none">
          <Alert color="warning">
            <span>
              <strong>Planned Maintenance: </strong>
              Starting at 18:30UTC On Feb 18th OmniExplorer will have a short maintenance window to upgrade back-end components. We expect this Maintenance to last up to an hour and during the maintenance Omni Explorer services will be unavailable. Once complete this message will be removed
            </span>
          </Alert>
        </div>
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
