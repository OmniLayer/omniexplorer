/* eslint-disable radix,no-restricted-globals */
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
import { Container } from 'reactstrap';
import styled from 'styled-components';
import List from 'components/List';
import TransactionListHeader from 'components/TransactionListHeader';
import Transaction from 'components/Transaction';
import LoadingIndicator from 'components/LoadingIndicator';

import injectSaga from 'utils/injectSaga';
import sagaTransactions from 'containers/Transactions/saga';

import { makeSelectLoading, makeSelectTransactions } from './selectors';
import { loadTransactions, setPage, setTransactionType } from './actions';

export class Transactions extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { page } = props.match.params;
    this.props.onSetPage(!page || isNaN(page) ? 0 : parseInt(page));
  }

  componentDidMount() {
    this.props.loadTransactions(this.props.addr);
    console.log('Transactions did mount');
  }

  render() {
    const StyledContainer = styled(Container)`
      background-color: #f0f3f4;
      overflow: auto;
    `;
    const StyledH3 = styled.h3`
      padding: 3rem 0;
    `;

    let content;

    if (this.props.loading) {
      content = <LoadingIndicator />;
    } else if ((this.props.transactions.transactions || []).length === 0) {
      content = (
        <StyledH3 className="lead text-center">
          <p className="h3">No Omni Protocol transactions found</p>
          <p className="h5">
            If the transaction you are searching for was just broadcast it might
            take a few minutes for the network to pass it around for us to see
            it.
          </p>
          <p className="h5">
            If the transaction you are searching for is a Bitcoin only
            transaction you should use a bitcoin block explorer like{' '}
            <a href="https://www.blocktrail.com">blocktrail.com</a>
          </p>
        </StyledH3>
      );
    } else {
      const pathname = this.props.addr ? `/address/${this.props.addr}` : '';
      const hashLink = v => `${pathname}/${v}`;
      const getItemKey = (item, idx) => item.txid.slice(0, 22).concat(idx);
      const { addr } = this.props;
      const props = {
        ...this.props.transactions,
        addr,
        inner: Transaction,
        onSetPage: this.props.onSetPage,
        hashLink,
        getItemKey,
      };
      props.items = props.transactions;
      content = <List {...props} usePagination/>;
    }

    return (
      <StyledContainer fluid>
        <TransactionListHeader
          selectType={this.props.onSetTransactionType}
          total={this.props.transactions.pageCount}
          totalLabel="page"
        />
        {content}
      </StyledContainer>
    );
  }
}

Transactions.propTypes = {
  loadTransactions: PropTypes.func,
  transactions: PropTypes.object.isRequired,
  onSetPage: PropTypes.func,
  loading: PropTypes.bool,
  addr: PropTypes.string,
  // location: PropTypes.object,
  match: PropTypes.object,
  onSetTransactionType: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
  loading: makeSelectLoading(),
  // location: state => state.get('route').get('location'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadTransactions: addr => dispatch(loadTransactions(addr)),
    onSetPage: p => dispatch(setPage(p)),
    onSetTransactionType: txtype => dispatch(setTransactionType(txtype)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSagaTransaction = injectSaga({
  key: 'transactions',
  saga: sagaTransactions,
});

export default compose(
  withConnect,
  withSagaTransaction,
)(Transactions);
