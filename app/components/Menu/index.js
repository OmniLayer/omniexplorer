/**
 *
 * Menu
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { DropdownItem, DropdownToggle, NavLink, UncontrolledCollapse } from 'reactstrap';
import { ECOSYSTEM_PROD_NAME, ECOSYSTEM_TEST_NAME, EXODUS_TXS_CLASS_AB } from 'containers/App/constants';

import './sidebar.css';

function Menu() {
  const appContainer = "app-container";

  return (
    <Menu customBurgerIcon={ <img src="/favicon.png" alt="OmniExplorer.info" />} outerContainerId={ appContainer} pageWrapId={ appContainer} >
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
  );
}

Menu.propTypes = {};

export default Menu;
