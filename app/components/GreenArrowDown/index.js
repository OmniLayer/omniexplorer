/**
 *
 * GreenArrowDown
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {ArrowDown} from '@styled-icons/fa-solid/ArrowDown';

const GreenArrowDown = styled(ArrowDown).attrs({
  size: 20,
  color: 'lightgreen',
})`
  margin: 0.5rem auto;
`;

GreenArrowDown.propTypes = {};

export default memo(GreenArrowDown);
