/**
 *
 * EcosystemLogo
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { NavLink } from "reactstrap";
// import isTestnet from 'utils/isTestnet';
// import isOmniFeather from 'utils/isOmniFeather';
// import isOmniLite from 'utils/isOmniLite';

const oeLogo = require('images/token1.png');
const ftcLogo = require('images/external_logos/ftc-logo.png');
const omniliteLogo = require('images/external_logos/omnilite-logo.png');

const IMGLogo = styled.img`
  display: inline;
`;

function EcosystemLogo() {
  // let Logo;

  // if (isOmniFeather) {
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
    {/*);*/}
  {/*} else {*/}
  {/*  Logo = (*/}
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
        <NavLink href="/omnilite">
          <IMGLogo
            src={omniliteLogo}
            alt="omnilite explorer"
            className="mr-3"
            style={{
              width: '2rem',
              height: '2rem',
            }}
          />
          OmniLite Explorer
        </NavLink>
      </>
    );
  // }

  return Logo;
}

EcosystemLogo.propTypes = {};

export default memo(EcosystemLogo);
