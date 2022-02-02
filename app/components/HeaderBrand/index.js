/**
 *
 * HeaderBrand
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { NavbarBrand } from 'reactstrap';
import isOmniExplorer from 'utils/isOmniExplorer';
import { getSufixURL } from 'utils/getLocationPath';
import { getLongName } from 'utils/getBlockchainName';

import isOmniFeather from 'utils/isOmniFeather';
import isLTC from 'utils/isLTC';

const ftcLogo = require('images/external_logos/ftc-logo.png');
const ltcLogo = require('images/external_logos/omnilite-logo.png');

const IMG = styled.img`
  //padding-bottom: 3px;
  //padding-right: 9px;
`;

function HeaderBrand() {
  const brandURL = getSufixURL() || '/';

  return (
    <NavbarBrand href={brandURL}>
      <span>
        {isOmniExplorer && (
          <IMG className="mr-1" src="/favicon.png" alt={getLongName()} />
        )}
        {isOmniFeather && (
          <IMG
            className="mr-1"
            src={ftcLogo}
            alt={getLongName()}
            style={{
              width: '2rem',
              height: '2rem',
            }}
          />
        )}
        {isLTC && (
          <IMG
            className="mr-1"
            src={ltcLogo}
            alt={getLongName()}
            style={{
              width: '2rem',
              height: '2rem',
            }}
          />
        )}
        {getLongName()}
      </span>
    </NavbarBrand>
  );
}

HeaderBrand.propTypes = {};

export default memo(HeaderBrand);
