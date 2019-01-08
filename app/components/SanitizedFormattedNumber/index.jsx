/**
 *
 * SanitizedFormattedNumber
 *
 */

import React from 'react';
import { FormattedNumber } from 'react-intl';
import { DEFAULT_NOT_NUMBER } from 'containers/App/constants';

function SanitizedFormattedNumber(props) {
// eslint-disable-next-line no-restricted-globals
  const isNumeric = (data) => (!isNaN(parseFloat(data)) && isFinite(data) && data.constructor !== Array);
  const propsValue = (props.value === undefined ? '' : props.value);
  const value = propsValue.toFixed ? propsValue.toFixed(8) : parseFloat(propsValue, 10).toString();
  const hasDecimals = propsValue && propsValue.indexOf && propsValue.indexOf('.') !== -1;

  const decimalPlaces = propsValue.indexOf ? propsValue.slice(propsValue.indexOf('.') + 1).length : value.slice(value.indexOf('.') + 1).length;
  let decimaldigits;
  if (hasDecimals || props.forceDecimals) {
    if (value % 1 === 0) {
      decimaldigits = `.${new Array(3).join('0')}`;
    } else {
      decimaldigits = decimalPlaces < 2 ? '0' : '';
    }
  } else {
    decimaldigits = '';
  }

  const fractionDigits = (
    decimaldigits ?
      3 :
      props.fractionDigits || (props.value < 8 ? decimalPlaces : 8)
  );
  const number = (isNumeric(value) ?
      (
        <span>
        <FormattedNumber
          value={value}
          minimunFractionDigits={fractionDigits}
          maximumFractionDigits={fractionDigits}
        />
          {!!fractionDigits && decimaldigits}
      </span>
      ) :
      <span>{DEFAULT_NOT_NUMBER}</span>
  );

  return number;
}

SanitizedFormattedNumber.propTypes = {};

export default SanitizedFormattedNumber;
