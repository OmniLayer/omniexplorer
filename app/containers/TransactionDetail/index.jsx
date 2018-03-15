/**
 *
 * TransactionDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Container } from 'reactstrap';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import LoadingIndicator from 'components/LoadingIndicator';
import TransactionInfo from 'components/TransactionInfo';

import makeSelectTransactionDetail from './selectors';
import sagaTxDetail from './saga';
import { loadTransaction } from './actions';
import reducer from './reducer';

export class TransactionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.txid = this.props.match.params.tx.toString();
  }

  componentDidMount() {
    this.props.loadTransaction(this.txid);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.tx !== this.txid) {
      this.props.loadTransaction(this.txid);
    }
  }

  render() {
    if (this.props.txdetail.loading) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }

    if (this.props.txdetail.transaction.notFound) {
      return (
        <Container>
          <h1> Transaction
          <small> { this.txid.slice(0, 24) }... </small>
            not found
          </h1>
        </Container>
      );
    }

    return (<TransactionInfo {...this.props.txdetail.transaction} />);
  }
}

TransactionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadTransaction: PropTypes.func,
  txdetail: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    loadTransaction: (addr, page) => dispatch(loadTransaction(addr, page)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  txdetail: makeSelectTransactionDetail(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'transactionDetail', reducer });
const withSaga = injectSaga({ key: 'transactionDetail', saga: sagaTxDetail });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionDetail);
