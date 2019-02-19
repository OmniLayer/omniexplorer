/**
 *
 * Asset
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

const StyledTDTextLeft = styled(StyledTD).attrs({
  className: 'text-left pt-3 text-truncate',
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
        <AssetLink asset={asset.id} state={props.state} >
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
      <StyledTDTextLeft>#{props[0]}</StyledTDTextLeft>
      <StyledTDTextLeft>
        <AssetLink asset={asset.id} state={props.state} >
          {`${asset.name.substring(0, 20)}${
            asset.name.length > 20 ? '...' : ''
          }`}
        </AssetLink>
      </StyledTDTextLeft>
      <StyledTDTextLeft>
        <Link
          to={{
            pathname: `/address/${asset.issuer}`,
            state: { state: props.state },
          }}
        >
          {props[2]}
        </Link>
      </StyledTDTextLeft>
    </tr>
  );
}

Asset.propTypes = {};

export default Asset;
