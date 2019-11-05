/**
 *
 * AddressWrapper
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AddressWrapper = styled.div.attrs({
  className: 'w-100-down-md address-wrapper',
})`
  display: inline;
`;

AddressWrapper.propTypes = {};

export default memo(AddressWrapper);
