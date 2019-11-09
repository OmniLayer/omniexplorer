/**
 *
 * GreenArrowForward
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { IoIosArrowRoundForward } from 'react-icons/io';
import PropTypes from 'prop-types';

const GreenArrowForward = styled(IoIosArrowRoundForward).attrs({
  size: 20,
  color: 'lightgreen',
})``;

GreenArrowForward.propTypes = {};

export default memo(GreenArrowForward);
