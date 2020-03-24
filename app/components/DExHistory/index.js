/**
 *
 * DExHistory
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function DExHistory() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DExHistory.propTypes = {};

export default DExHistory;
