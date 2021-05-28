/**
 *
 * Asset
 *
 */

import React from 'react';
import StyledLink from 'components/StyledLink';
import { getSufixURL } from 'utils/getLocationPath';
import styled from 'styled-components';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

const StyledTDTextLeft = styled.td.attrs({
  className: 'text-left pt-3 text-truncate align-middle',
})``;

function Asset(props) {
  const asset = {
    id: props[0],
    name: props[1],
    issuer: props[2],
    flags: props[3],
  };

  return (
    <tr>
      <StyledTD style={{ width: '56px' }}>
        <AssetLink asset={asset.id}>
          <AssetLogo
            asset={asset}
            prop={asset.id}
            style={{
              width: '4rem',
              height: '4rem',
            }}
          />
        </AssetLink>
      </StyledTD>
      <StyledTDTextLeft>
        <AssetLink asset={asset.id}>
          #{asset.id}
        </AssetLink></StyledTDTextLeft>
      <StyledTDTextLeft>
        <AssetLink asset={asset.id}>
          {`${asset.name.substring(0, 20)}${
            asset.name.length > 20 ? '...' : ''
          }`}
        </AssetLink>
      </StyledTDTextLeft>
      <StyledTDTextLeft>
        <StyledLink
          to={{
            pathname: `${getSufixURL()}/address/${asset.issuer}`,
            state: { state: props.state },
          }}
        >
          {asset.issuer}
        </StyledLink>
      </StyledTDTextLeft>
    </tr>
  );
}

Asset.propTypes = {};

export default Asset;
