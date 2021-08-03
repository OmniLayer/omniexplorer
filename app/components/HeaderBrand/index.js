/**
 *
 * HeaderBrand
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavbarBrand } from 'reactstrap';
import isOmniExplorer from 'utils/isOmniExplorer';
import isOmniFeather from 'utils/isOmniFeather';
import isLTC from 'utils/isLTC';
import { getSufixURL } from 'utils/getLocationPath';

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
`;

function HeaderBrand() {
  const brandURL = getSufixURL();

  return (
    <NavbarBrand href={brandURL}>
      {isOmniExplorer && (
        <span>
          <IMG src="/favicon.png" alt="OmniExplorer.info" />
          OmniExplorer.info
        </span>
      )}
      {isOmniFeather && <span>OmniFeather Explorer</span>}
      {isLTC && <span>LTC Explorer</span>}
    </NavbarBrand>
  );
}

HeaderBrand.propTypes = {};

export default memo(HeaderBrand);
