/**
 *
 * FormattedDateTime
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';

import messages from './messages';

const FormattedDateTime = ({
  datetime,
  key = Date.now(),
  useSeconds = true,
}) => {
  // eslint-disable-next-line no-unused-vars
  const id = `id_${key}`;
  const seconds = useSeconds ? { second: 'numeric' } : null;

  return (
    <span>
      <FormattedMessage
        {...messages.datetime}
        values={{
          date: <FormattedDate value={datetime} />,
          hour: (
            <FormattedTime
              value={datetime}
              hour="numeric"
              minute="numeric"
              {...seconds}
            />
          ),
        }}
      />
    </span>
  );
};

FormattedDateTime.propTypes = {
  datetime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  key: PropTypes.any,
  useSeconds: PropTypes.bool,
};

export default FormattedDateTime;
