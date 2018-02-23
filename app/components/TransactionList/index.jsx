/**
 *
 * TransactionList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Transaction from 'components/Transaction';

class TransactionList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const repeatTransactions = (trxs) => (trxs || []).map((trx, idx) => <Transaction key={trx.txid} transaction={trx} />);

    if (!this.props.transactions || this.props.transactions.length === 0) {
      return (
        <h4>Loading...</h4>
      );
    }

    return (
      <ul className="result-list">
        {repeatTransactions(this.props.transactions)}
      </ul>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default TransactionList;
