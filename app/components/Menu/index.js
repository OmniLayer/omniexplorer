/**
 *
 * Menu
 *
 */

import React, { useState } from 'react';
import { Col, NavLink, Row } from 'reactstrap';
import styled from 'styled-components';
import Switch from 'rc-switch';
import getLocationPath, { getSufixURL } from 'utils/getLocationPath';
import { ECOSYSTEM_PROD_NAME, ECOSYSTEM_TEST_NAME, EXODUS_TXS_CLASS_AB } from 'containers/App/constants';

import DarkModeToggle from 'components/DarkModeToggle';
import MenuButton from 'components/MenuButton';

import isTestnet from 'utils/isTestnet';

import './menu.scss';
import './switch.scss';

const MenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.15);
  margin-top: 6px;
  margin-bottom: 12px;
`;

function Menu() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [testnet, setTestnet] = useState(isTestnet);

  return (
    <div>
      <MenuButton menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
      <div
        className="menu__block"
        style={{ display: !menuOpened ? 'none' : '' }}
      >
        <Row>
          <Col>
            <h4 className="d-inline-block">Menu</h4>
            <div className="d-inline-block float-right align-bottom">
              <DarkModeToggle />
            </div>
          </Col>
          <Col>
            <Switch
              onChange={() => {
                setTestnet(!testnet);
                setTimeout(() => {
                  window.location = `/${testnet ? '' : 'testnet'}`;
                }, 1000);
              }}
              checkedChildren="Mainnet"
              defaultChecked={!testnet}
              unCheckedChildren="Testnet"
              className="hack-switch"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <MenuDivider />
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="4">
            <h5>Property List</h5>
            <NavLink href={`${getSufixURL()}/properties/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}>Production</NavLink>
            <NavLink href={`${getSufixURL()}/properties/${ECOSYSTEM_TEST_NAME.toLowerCase()}`}>Test</NavLink>
            <h5>Crowdsales</h5>
            <NavLink href={`${getSufixURL()}/crowdsales/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}>Production</NavLink>
            <NavLink href={`${getSufixURL()}/crowdsales/${ECOSYSTEM_TEST_NAME.toLowerCase()}`}>Test</NavLink>
          </Col>
          <Col xs="6" sm="4">
            <h5>Misc</h5>
            <NavLink href={`/${EXODUS_TXS_CLASS_AB}`}>Recent Class A/B TX's</NavLink>
            <NavLink href={`${getSufixURL()}/activations`}>Feature Activations</NavLink>
            {/*  <NavLink href="/exchange">Exchange</NavLink>*/}
            {/*  <NavLink href="/analytics">Analytics</NavLink>*/}
            <NavLink href="https://github.com/OmniLayer/omniexplorer/wiki/OmniExplorer-FAQ"
                     target="_blank">Help/FAQ</NavLink>
            <NavLink href="https://github.com/OmniLayer/omniexplorer/issues" target="_blank">Report Bug</NavLink>
          </Col>
          <Col xs="6" sm="4">
            <h5>API</h5>
            <NavLink href={getLocationPath()}>Documentation</NavLink>
          </Col>
        </Row>
      </div>
    </div>
  );
}

Menu.propTypes = {};

export default Menu;
