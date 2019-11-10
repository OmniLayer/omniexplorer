/**
 *
 * WrapperTx
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WrapperTx = styled.div.attrs({
  className: 'location d-block-down-md text-truncate-down-md',
})`
  font-size: 1.25rem !important;
  padding: 0 1rem;
`;

WrapperTx.propTypes = {};

export default memo(WrapperTx);
