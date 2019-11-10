/**
 *
 * GrayArrowForward
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoIosArrowRoundForward } from 'react-icons/io';


const GrayArrowForward = styled(IoIosArrowRoundForward).attrs({
  size: 20,
  color: 'gray',
})``;

GrayArrowForward.propTypes = {};

export default memo(GrayArrowForward);
