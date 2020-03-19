/**
 *
 * DExPairs
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function DExPairs() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DExPairs.propTypes = {};

export default DExPairs;
