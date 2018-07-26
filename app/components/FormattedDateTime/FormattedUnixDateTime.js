/**
 *
 * FormattedDateTime
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormattedDateTime from './FormattedDateTime';

const FormattedUnixDateTime = ({ datetime, useSeconds }) =>
  new Date(datetime * 1000).getTime() > 0 ? (
    <FormattedDateTime datetime={datetime * 1000} useSeconds={useSeconds} />
  ) : (
    <span> invalid date</span>
  );

FormattedUnixDateTime.propTypes = {
  datetime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  useSeconds: PropTypes.bool,
};

export default FormattedUnixDateTime;
