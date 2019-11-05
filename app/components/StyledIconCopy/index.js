/**
 *
 * StyledIconCopy
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { IoIosCopy } from 'react-icons/io';

const StyledIconCopy = styled(IoIosCopy).attrs({
  className: 'btn-outline-info rounded',
})``;

StyledIconCopy.propTypes = {};

export default memo(StyledIconCopy);
