/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

import SearchBox from 'components/SearchBox';

import './header.scss';

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
`;

// function Header(props) {
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="faded" light expand="md">
        <Container className="d-block">
          <Row className="clearfix">
            <Col>
              <NavbarBrand href="/" className="navbar-brand">
                <IMG src="/favicon.png" alt="OMNIEXPLORER.INFO" />
                OMNIEXPLORER.INFO
              </NavbarBrand>
            </Col>
            <Col>
              <SearchBox />
            </Col>
          </Row>
          <Row className="clearfix">
            <Col xs="12">
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/">Home</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Exchange
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href="/">Bitcoin / OMNI  (data coming soon)</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/">Smart Properties (data coming soon)</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      API
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href="https://api.omniwallet.org">Documentation</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Smart Property
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href="/">Property List (Main Eco)</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/">Property List (Test Eco)</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/">Active Crowdsales</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink href="/">Usage Graphs (coming soon)</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      MISC
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href="/">Feature Activations (Coming Soon)</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="http://omniexplorer.info/wallets.aspx">Wallets</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="http://support.omniwallet.org">Help</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
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
  // pass in custom element to use
};
