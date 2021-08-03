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
import isOmniLite from 'utils/isOmniLite';
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
      {isOmniLite && <span>OmniLite Explorer</span>}
    </NavbarBrand>
  );
}

HeaderBrand.propTypes = {};

export default memo(HeaderBrand);
