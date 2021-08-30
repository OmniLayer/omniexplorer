/**
 *
 * HeaderBrand
 *
 */

import React, { memo } from "react";
import styled from "styled-components";
import { NavbarBrand } from "reactstrap";
import isOmniExplorer from "utils/isOmniExplorer";
import { getSufixURL } from "utils/getLocationPath";
import { getLongName } from "utils/getBlockchainName";

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
`;

function HeaderBrand() {
  const brandURL = getSufixURL() || "/";

  return (
    <NavbarBrand href={brandURL}>
        <span>
          {isOmniExplorer &&
          <IMG src="/favicon.png" alt={getLongName()} />
          }
          {getLongName()}
        </span>
    </NavbarBrand>
  );
}

HeaderBrand.propTypes = {};

export default memo(HeaderBrand);
