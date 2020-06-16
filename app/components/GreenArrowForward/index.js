/**
 *
 * GreenArrowForward
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import {ArrowCircleRight} from '@styled-icons/fa-solid/ArrowCircleRight';

import PropTypes from 'prop-types';

const GreenArrowForward = styled(ArrowCircleRight).attrs({
  size: 20,
  color: 'green',
})`
  vertical-align: middle;
`;

GreenArrowForward.propTypes = {};

export default memo(GreenArrowForward);
