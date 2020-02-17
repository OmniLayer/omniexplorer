/**
 *
 * StyledA
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';

const StyledA = styled.a.attrs({
  className: 'mr-1 text-truncate',
})`
  color: #337ab7;

  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: #6cc0e5;
  }
`;

StyledA.propTypes = {};

export default memo(StyledA);
