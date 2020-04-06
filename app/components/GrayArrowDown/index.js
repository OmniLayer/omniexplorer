/**
 *
 * GrayArrowDown
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ArrowDown} from '@styled-icons/fa-solid/ArrowDown';

const GrayArrowDown = styled(ArrowDown).attrs({
  size: 20,
  color: 'gray',
})`
  margin: 0.5rem auto;
`;

GrayArrowDown.propTypes = {};

export default memo(GrayArrowDown);
