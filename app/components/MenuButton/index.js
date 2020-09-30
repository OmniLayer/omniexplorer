/**
 *
 * MenuButton
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function MenuButton() {
  return (
    <div className="hover__mobile">
      <div className="wrap-menu">
        <div className="menu__btn">
          <div className="menu__icon"></div>
        </div>
      </div>
    </div>
  );
}

MenuButton.propTypes = {};

export default MenuButton;
