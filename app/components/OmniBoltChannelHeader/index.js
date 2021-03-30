/**
 *
 * OmniBoltChannelHeader
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function OmniBoltChannelHeader() {
  return (
    <thead>
    <tr>
      <th className="text-left">
        <FormattedMessage {...messages.columns.channelid} />
      </th>
      <th className="text-center">
        <FormattedMessage {...messages.columns.propertyid} />
      </th>
      <th className="text-center">
        <FormattedMessage {...messages.columns.balancea} />
      </th>
      <th className="text-center">
        <FormattedMessage {...messages.columns.balanceb} />
      </th>
    </tr>
    </thead>
  );
}

OmniBoltChannelHeader.propTypes = {};

export default OmniBoltChannelHeader;
