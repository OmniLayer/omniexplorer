/**
 *
 * OnlineStatus
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { Signal } from '@styled-icons/fa-solid/Signal';

const OnlineStatus = styled(Signal).attrs({
  className: 'signal-status-icon',
})`
  vertical-align: middle;
  margin-left: 0.5rem;
  cursor: pointer;
  //color: #17a2b8;
`;

OnlineStatus.propTypes = {};

export default memo(OnlineStatus);
