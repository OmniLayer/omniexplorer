/**
 *
 * StyledLink
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StyledLink = styled(Link).attrs({
  className: 'mr-1 text-truncate',
})`
  color: #333;
`;

StyledLink.propTypes = {};

export default memo(StyledLink);
