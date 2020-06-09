/**
 *
 * GreenArrowForward
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import {ArrowRight} from '@styled-icons/fa-solid/ArrowRight';

import PropTypes from 'prop-types';

const GreenArrowForward = styled(ArrowRight).attrs({
  size: 20,
  color: 'green',
})`
  vertical-align: middle;
`;

GreenArrowForward.propTypes = {};

export default memo(GreenArrowForward);
