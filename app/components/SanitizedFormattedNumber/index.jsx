/**
 *
 * SanitizedFormattedNumber
 *
 */

import React from 'react';
import { FormattedNumber } from 'react-intl';
import { DEFAULT_NOT_NUMBER } from 'containers/App/constants';

function SanitizedFormattedNumber(props) {
  const isNumeric = (data) => (!isNaN(parseFloat(data)) && isFinite(data) && data.constructor !== Array);
  const value = parseFloat(props.value, 10);
  const valueStr = props.value.toString();
  const minimumFractionDigits = (value !== 0 ? valueStr.slice(valueStr.indexOf('.') + 1).length : 0);
  const number = (isNumeric(props.value) ?
      <FormattedNumber value={value} minimumFractionDigits={minimumFractionDigits}/> :
      <span>{ DEFAULT_NOT_NUMBER }</span>
  );
  
  return number;
}

SanitizedFormattedNumber.propTypes = {};

export default SanitizedFormattedNumber;
