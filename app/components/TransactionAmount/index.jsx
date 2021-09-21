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
  const titleAmount =
    props.type_int === 4 && props.subsends.length > 1 ? 'Amounts' : 'Amount';

  const TransactionAmountRecord = (
    <tr>
      <td className="field">{titleAmount}</td>
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
