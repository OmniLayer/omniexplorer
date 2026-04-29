/**
 *
 * EcosystemLogo
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'reactstrap';

const oeLogo = require('images/token1.png');
// const btcLogo = require('images/token0.png');

const IMGLogo = styled.img`
  display: inline;
`;

function EcosystemLogo() {
  const Logo = (
    <>
      <NavLink className="pr-0" href="/">
        <IMGLogo
          src={oeLogo}
          alt="omniexplorer"
          className="mr-3"
          style={{
            width: '2rem',
            height: '2rem',
          }}
        />
        Omni Layer
      </NavLink>
    </>
  );

  return Logo;
}

EcosystemLogo.propTypes = {};

export default memo(EcosystemLogo);
