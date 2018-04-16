/**
 *
 * FormattedDateTime
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import messages from './messages';

const FormattedDateTime = ({ datetime }) => (
  <FormattedMessage
    {...messages.datetime}
    values={{
      date: <FormattedDate value={datetime} />,
      hour: <FormattedTime value={datetime} hour="numeric" minute="numeric" second="numeric" />,
    }}
  />
);

FormattedDateTime.propTypes = {
  datetime: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default FormattedDateTime;
