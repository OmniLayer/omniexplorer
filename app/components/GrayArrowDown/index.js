/**
 *
 * GrayArrowDown
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from 'react-icons/io';

const GrayArrowDown = styled(IoIosArrowDown).attrs({
  size: 20,
  color: 'gray',
})``;

GrayArrowDown.propTypes = {};

export default memo(GrayArrowDown);
