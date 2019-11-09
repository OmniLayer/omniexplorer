/**
 *
 * GreenArrowDown
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

const GreenArrowDown = styled(IoIosArrowDown).attrs({
  size: 20,
  color: 'lightgreen',
})``;

GreenArrowDown.propTypes = {};

export default memo(GreenArrowDown);
