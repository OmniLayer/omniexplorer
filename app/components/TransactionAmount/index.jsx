/**
 *
 * TransactionAmount
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TransactionAmountFactory from './TransactionAmountFactory';
import TransactionAmountTitleFactory from './TransactionAmountTitleFactory';

const TransactionAmount = props => {
  const transactionAmount = TransactionAmountFactory(props);

  const TransactionAmountRecord = (
    <tr>
      <td className="field">Amount</td>
      <td>
        {transactionAmount}
      </td>
    </tr>
  );

  return transactionAmount && TransactionAmountRecord;
};

TransactionAmount.propTypes = {
  type_int: PropTypes.number,
  subsends: PropTypes.array,
};

export default TransactionAmount;
export { TransactionAmountFactory, TransactionAmountTitleFactory };
