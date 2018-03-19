/**
 *
 * FormattedDateTime
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormattedDateTime from './FormattedDateTime';

const FormattedUnixDateTime = ({ datetime }) => <FormattedDateTime datetime={datetime * 1000} />;

FormattedUnixDateTime.propTypes = {
};

export default FormattedUnixDateTime;
