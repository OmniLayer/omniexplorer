/**
 *
 * InfoCircleIcon
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { InfoCircle } from '@styled-icons/fa-solid/InfoCircle';
import styled from 'styled-components';

const InfoCircleIcon = styled(InfoCircle).attrs({
  className: 'ml-1',
})`
  height: 1.1rem !important;
  width: 1.1rem !important;
  color: gray;
`;

InfoCircleIcon.propTypes = {};

export default memo(InfoCircleIcon);
