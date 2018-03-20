/**
 *
 * SanitizedFormattedNumber
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { DEFAULT_NOT_NUMBER } from 'containers/App/constants';

function SanitizedFormattedNumber(props) {
  const isNumeric = (data) => (!isNaN(parseFloat(data)) && isFinite(data) && data.constructor !== Array);
  const number = (isNumeric(props.value) ?
      <FormattedNumber value={parseFloat(props.value, 10)} /> :
      <span>{ DEFAULT_NOT_NUMBER }</span>
  );
  
  return number;
}

SanitizedFormattedNumber.propTypes = {};

export default SanitizedFormattedNumber;
