/**
 *
 * WarningTooltip
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { UncontrolledTooltip } from 'reactstrap';

const WarningTooltip = styled(UncontrolledTooltip).attrs({
  innerClassName: 'bg-danger',
})`
  &.bs-tooltip-top .arrow::before {
    border-top-color: #dc3545 !important;
  }
  &.bs-tooltip-bottom .arrow::before {
    border-bottom-color: #dc3545 !important;
  }
  &.bs-tooltip-right .arrow::before {
    border-right-color: #dc3545 !important;
  }
  &.bs-tooltip-left .arrow::before {
    border-left-color: #dc3545 !important;
  }
`;

WarningTooltip.propTypes = {};

export default memo(WarningTooltip);
