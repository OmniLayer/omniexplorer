/**
 *
 * Transactions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import TransactionList from 'components/TransactionList';

import makeSelectTransactions from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadTransactions } from './actions';


export class Transactions extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadTransactions();
  }

  render() {
    return (<TransactionList />);
  }
}

Transactions.propTypes = {
  loadTransactions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadTransactions: () => dispatch(loadTransactions()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'transactions', reducer });
const withSaga = injectSaga({ key: 'transactions', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Transactions);
