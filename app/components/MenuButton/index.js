/**
 *
 * MenuButton
 *
 */

import React from 'react';
import './menu-button.css';

function MenuButton(props) {
  return (
    <div
      className={`wrap-menu ${!!props.menuOpened && 'menu__opened'}`}
      onClick={props.toggleMenu}
    >
      <div className="menu__btn">
        <div className="menu__icon" />
      </div>
    </div>
  );
}

MenuButton.propTypes = {};

export default MenuButton;
