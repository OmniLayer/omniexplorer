/**
 *
 * WrapperTxDatetime
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WrapperTxDatetime = styled.div.attrs({
  className: 'wrapper-tx-timestamp w-75 mb-3',
})`
  font-size: 1.25rem !important;
  color: #333;
`;

WrapperTxDatetime.propTypes = {};

export default memo(WrapperTxDatetime);
