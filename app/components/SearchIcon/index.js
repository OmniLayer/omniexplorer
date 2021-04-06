/**
 *
 * SearchIcon
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Search } from '@styled-icons/fa-solid/Search';

const SearchIcon = styled(Search).attrs({
  className: 'search-icon',
  size: 21,
})`
  height: auto;
  margin-left: -3rem;
  z-index: 333;

  &:not([disabled]) {
    cursor: pointer;
  }

  &[disabled] {
    opacity: 50%;
  }
`;

SearchIcon.propTypes = {};

export default memo(SearchIcon);
