/**
 *
 * EcosystemLogo
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'reactstrap';

const oeLogo = require('images/token1.png');
const ftcLogo = require('images/external_logos/ftc-logo.png');
const ltcLogo = require('images/external_logos/omnilite-logo.png');

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
        OmniExplorer
      </NavLink>
      <NavLink href="/ftc">
        <IMGLogo
          src={ftcLogo}
          alt="omnifeather explorer"
          className="mr-3"
          style={{
            width: '2rem',
            height: '2rem',
          }}
        />
        OmniFeather Explorer
      </NavLink>
      <NavLink href="/ltc">
        <IMGLogo
          src={ltcLogo}
          alt="ltc explorer"
          className="mr-3"
          style={{
            width: '2rem',
            height: '2rem',
          }}
        />
        LTC Explorer
      </NavLink>
    </>
  );

  return Logo;
}

EcosystemLogo.propTypes = {};

export default memo(EcosystemLogo);
