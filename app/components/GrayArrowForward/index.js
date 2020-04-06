/**
 *
 * GrayArrowForward
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ArrowRight} from '@styled-icons/fa-solid/ArrowRight';

const GrayArrowForward = styled(ArrowRight).attrs({
  size: 20,
  color: 'gray',
})`
  vertical-align: middle;
`;

GrayArrowForward.propTypes = {};

export default memo(GrayArrowForward);
