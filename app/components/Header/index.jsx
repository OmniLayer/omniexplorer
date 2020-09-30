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

import DarkModeToggle from 'components/DarkModeToggle';

// import { slide as Menu } from 'react-burger-menu';
import { push as Menu } from 'react-burger-menu';
// import Menu from 'react-burger-menu/lib/menus/slide';

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
          <Navbar color="faded" dark>
            <NavbarBrand href="/">
              <IMG src="/favicon.png" alt="OMNIEXPLORER.INFO" />
              OMNIEXPLORER.INFO
            </NavbarBrand>
          <DarkModeToggle />
          <NavbarToggler onClick={this.toggle} />
          {/*asdñlkfasñlkdfj*/}
        </Navbar>
        <ServiceBlock />
      </div>
    );
  }
}

// const oldnavbar = (
//   <StyledNavigationBar fixed="top">
//     <div className="d-flex">
//       <NavbarBrand href="/">
//         OmniExplorer.info
//       </NavbarBrand>
//       <DarkModeToggle />
//       <div className="ml-auto w-50 d-flex">
//         <div className="w-100 ml-auto d-none-only-sm-down">
//           <SearchBox />
//         </div>
//         <NavbarToggler onClick={this.toggle} />
//       </div>
//     </div>
//   </StyledNavigationBar>
// );

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
