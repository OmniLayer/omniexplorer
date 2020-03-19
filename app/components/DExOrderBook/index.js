/**
 *
 * DExOrderBook
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function DExOrderBook() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DExOrderBook.propTypes = {};

export default DExOrderBook;
