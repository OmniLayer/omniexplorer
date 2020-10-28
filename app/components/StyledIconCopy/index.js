/**
 *
 * StyledIconCopy
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { Copy } from '@styled-icons/fa-solid/Copy';

const StyledIconCopy = styled(Copy).attrs({
  className: 'rounded styled-icon-copy',
})`
  vertical-align: middle;
  margin-left: 0.5rem;
  //color: #17a2b8;
`;

StyledIconCopy.propTypes = {};

export default memo(StyledIconCopy);
