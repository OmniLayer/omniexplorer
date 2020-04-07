/**
 *
 * StyledIconCopy
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { Copy } from '@styled-icons/fa-solid/Copy';

const StyledIconCopy = styled(Copy).attrs({
  className: 'btn-outline-info rounded',
})`
  vertical-align: middle;
  margin-left: 0.5rem;
`;

StyledIconCopy.propTypes = {};

export default memo(StyledIconCopy);
