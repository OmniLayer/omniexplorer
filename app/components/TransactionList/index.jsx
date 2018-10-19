/**
 *
 * TransactionList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListPagination from 'components/ListPagination';

class TransactionList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const Transaction = this.props.inner;
    const props = {
      ...this.props.addr,
      ...this.props.options,
    };
    
    return (
      <div>
        <ListPagination {...this.props} onSetPage={this.props.onSetPage} />
        {/*<TransactionList inner={Transaction} {...props} />*/}
        <ul className="result-list">
          { this.props.transactions.map((trx, idx) =>
              <Transaction {...props} key={trx.txid.slice(0, 22).concat(idx)} {...trx} />
            )
          }
        </ul>
        <ListPagination {...this.props} onSetPage={this.props.onSetPage} />
      </div>
    );
  }
}

TransactionList.propTypes = {
  // transactions: PropTypes.array.isRequired,
};

export default TransactionList;
