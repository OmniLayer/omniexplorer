/**
 *
 * OmniBOLTNodesHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const OmniBOLTNodesHeader = () => (
  <thead>
  <tr>
    <th className="text-left">
      <FormattedMessage {...messages.columns.online} />
    </th>
    <th className="">
      <FormattedMessage {...messages.columns.id} />
    </th>
    <th className="">
      <FormattedMessage {...messages.columns.p2paddress} />
    </th>
    <th className="">
      <FormattedMessage {...messages.columns.loginip} />
    </th>
    <th className="">
      <FormattedMessage {...messages.columns.logintime} />
    </th>
    <th className="text-left">
      <FormattedMessage {...messages.columns.offlinetime} />
    </th>
  </tr>
  </thead>
);

OmniBOLTNodesHeader.propTypes = {};

export default OmniBOLTNodesHeader;
