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
    return (
      <ul className="result-list">
        { this.props.transactions.map((trx) => <Transaction key={trx.txid} {...trx} />) }
      </ul>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionList;
