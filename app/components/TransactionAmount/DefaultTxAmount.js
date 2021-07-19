import React from 'react';
import PropTypes from 'prop-types';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';

const DefaultTxAmount = props => (
  <SanitizedFormattedNumber className="default-tx-amount" value={props.amount || (props.asset && props.asset.amount)} />
);

DefaultTxAmount.propTypes = {
  amount: PropTypes.any.isRequired,
};

export default DefaultTxAmount;
