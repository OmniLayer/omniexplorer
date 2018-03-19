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
        { this.props.transactions.map((trx, idx) => <Transaction addr={this.props.addr} key={trx.txid.slice(0, 22).concat(idx)} {...trx} />) }
      </ul>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionList;
