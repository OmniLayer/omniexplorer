/**
 *
 * Menu
 *
 */

import React, { useEffect, useReducer, useState } from 'react';
import { Col, NavLink, Row } from 'reactstrap';
import styled from 'styled-components';
import Switch from 'rc-switch';
import parseKey from 'parse-key';

import getLocationPath, { getSufixURL } from 'utils/getLocationPath';
import {
  ECOSYSTEM_PROD_NAME,
  ECOSYSTEM_TEST_NAME,
  TXS_CLASS_AB,
} from 'containers/App/constants';

import DarkModeToggle from 'components/DarkModeToggle';
import MenuButton from 'components/MenuButton';

import isTestnet from 'utils/isTestnet';
import isOmniFeather from 'utils/isOmniFeather';
import menuReducer, { initialState } from 'components/Menu/reducer';
import { toggleDisabledTestnet } from './actions';

import './menu.scss';
import './switch.scss';
const oeLogo = require('images/token1.png');
const ftcLogo = require('images/external_logos/token0.png');

const MenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.15);
  margin-top: 6px;
  margin-bottom: 12px;
`;

const IMGLogo = styled.img`
  display: inline;
`;

function Menu(props) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [testnet, setTestnet] = useState(isTestnet);
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const toggleMenu = syntheticEvent => {
    const newState = !menuOpened;
    syntheticEvent.stopPropagation();
    setMenuOpened(newState);
    if (newState) {
      window.addEventListener('click', globalClickListener);
    }
  };

  const globalClickListener = nativeEvent => {
    // if clicked outside of menu close it
    const clickedOutsideMenu = !nativeEvent
      .composedPath()
      .some(e => e.classList && e.classList.contains('menu__block'));
    if (clickedOutsideMenu) {
      setMenuOpened(false);
      window.removeEventListener('click', globalClickListener);
    }
  };

  const matchesKey = (key, event) => {
    if (!key) {
      return false;
    }

    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);
    return (
      key.name.toUpperCase() === char.toUpperCase() &&
      key.alt === event.altKey &&
      key.ctrl === event.ctrlKey &&
      key.meta === event.metaKey &&
      key.shift === event.shiftKey
    );
  };

  const handleKeyDown = e => {
    // Ignore regular keys when focused on a field
    // and no modifiers are active.
    if (
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      (e.target.tagName === 'INPUT' ||
        e.target.tagName === 'SELECT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable)
    ) {
      return;
    }

    const visibilityKey = parseKey('shift-ctrl-alt-t');

    if (matchesKey(visibilityKey, e)) {
      e.preventDefault();
      // dispatch action
      dispatch(toggleDisabledTestnet());
    }
  };

  useEffect(() => {
    window.addEventListener('click', globalClickListener);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      setMenuOpened(false);
      window.removeEventListener('click', globalClickListener);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <MenuButton menuOpened={menuOpened} toggleMenu={toggleMenu} />
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
              disabled={state.disabledTestnet}
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
            <NavLink
              href={`${getSufixURL()}/properties/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}
            >
              Production
            </NavLink>
            <NavLink
              href={`${getSufixURL()}/properties/${ECOSYSTEM_TEST_NAME.toLowerCase()}`}
            >
              Test
            </NavLink>
            <h5>Crowdsales</h5>
            <NavLink
              href={`${getSufixURL()}/crowdsales/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}
            >
              Production
            </NavLink>
            <NavLink
              href={`${getSufixURL()}/crowdsales/${ECOSYSTEM_TEST_NAME.toLowerCase()}`}
            >
              Test
            </NavLink>
          </Col>
          <Col xs="6" sm="4">
            <h5>Misc</h5>
            {isOmniFeather && (
              <NavLink className="pr-0" href="/">
                <IMGLogo
                  src={oeLogo}
                  alt="omniexplorer"
                  className={'mr-3'}
                  style={{
                    width: '2rem',
                    height: '2rem',
                  }}
                />
                OmniExplorer
              </NavLink>
            )}
            {!isOmniFeather && (
              <NavLink href="/ftc">
                <IMGLogo
                  src={ftcLogo}
                  alt="omnifeather explorer"
                  className={'mr-3'}
                  style={{
                    width: '2rem',
                    height: '2rem',
                  }}
                />
                OmniFeather Explorer
              </NavLink>
            )}
            {!isOmniFeather && (
              <NavLink href={`${getSufixURL()}/${TXS_CLASS_AB}`}>
                Recent Class A/B TX's
              </NavLink>
            )}
            <NavLink href={`${getSufixURL()}/activations`}>
              Feature Activations
            </NavLink>
            {isTestnet && <NavLink href="/exchange">Exchange</NavLink>}
            {/*  <NavLink href="/analytics">Analytics</NavLink> */}
            <NavLink
              href="https://github.com/OmniLayer/omniexplorer/wiki/OmniExplorer-FAQ"
              target="_blank"
            >
              Help/FAQ
            </NavLink>
            <NavLink
              href="https://github.com/OmniLayer/omniexplorer/issues"
              target="_blank"
            >
              View/Report Issues
            </NavLink>
          </Col>
          <Col xs="6" sm="4">
            <h5>API</h5>
            <NavLink href={getLocationPath()}>Documentation</NavLink>
            <h5>Omni Lab</h5>
            <NavLink
              href="https://omnilab.online/omni-academy/"
              target="_blank"
            >
              Omni Academy
            </NavLink>
            <NavLink href="https://omnilab.online/omniwallet/" target="_blank">
              Omni Wallet
            </NavLink>
            <NavLink href="https://omnilab.online/OmniBOLT/" target="_blank">
              OmniBOLT
            </NavLink>
          </Col>
        </Row>
      </div>
    </div>
  );
}

Menu.propTypes = {};

export default Menu;
