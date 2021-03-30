/**
 *
 * OmniBoltUserHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function OmniBoltUserHeader() {
  return (
    <thead>
    <tr>
      <th className="text-left">
        <FormattedMessage {...messages.columns.online} />
      </th>
      <th className="text-center">
        <FormattedMessage {...messages.columns.userid} />
      </th>
      <th className="text-center">
        <FormattedMessage {...messages.columns.obdnodeid} />
      </th>
      <th className="text-center">
        <FormattedMessage {...messages.columns.obdp2pnodeid} />
      </th>
      <th className="text-center">
        <FormattedMessage {...messages.columns.offlinetime} />
      </th>
    </tr>
    </thead>
  );
}

OmniBoltUserHeader.propTypes = {};

export default OmniBoltUserHeader;
