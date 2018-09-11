/**
 *
 * Asset
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import getLogo from 'utils/getLogo';

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

const StyledTDTextLeft = styled(StyledTD).attrs({
  className: 'text-left pt-3 text-truncate',
})``;

function Asset(props) {
  const logo = getLogo(props[0], { flags: props[3] });
  return (
    <tr>
      <StyledTD style={{ width: '56px' }}>
        <img
          style={{
            width: '4rem',
            height: '4rem',
          }}
          src={logo}
        />
      </StyledTD>
      <StyledTDTextLeft>
        #{props[0]}
      </StyledTDTextLeft>
      <StyledTDTextLeft>
        <Link
          to={{
            pathname: `/asset/${props[0]}`,
          }}
          onClick={() => props.changeRoute(`/asset/${props[0]}`)}
        >
          {`${props[1].substring(0, 20)}${(props[1].length > 20 ? '...' : '')}`}
        </Link>
      </StyledTDTextLeft>
      <StyledTDTextLeft>
        <Link
          to={{
            pathname: `/address/${props[2]}`,
          }}
          onClick={() => props.changeRoute(`/address/${props[2]}`)}
        >
          {props[2]}
        </Link>
      </StyledTDTextLeft>
    </tr>
  );
}

Asset.propTypes = {};

export default Asset;
