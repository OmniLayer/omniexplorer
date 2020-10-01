/**
 *
 * MenuButton
 *
 */

import React, { useState } from 'react';
import './menu-button.css';

function MenuButton() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div
      className={`wrap-menu ${!!menuOpened && 'menu__opened'}`}
      onClick={() => setMenuOpened(!menuOpened)}
    >
      <div className="menu__btn">
        <div className="menu__icon" />
      </div>
    </div>
  );
}

MenuButton.propTypes = {};

export default MenuButton;
