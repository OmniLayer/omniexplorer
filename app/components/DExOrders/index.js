/**
 *
 * DExOrders
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function DExOrders() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DExOrders.propTypes = {};

export default DExOrders;
