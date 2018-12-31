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
import styled from 'styled-components';
import List from 'components/List';
import TransactionListHeader from 'components/TransactionListHeader';
import Transaction from 'components/Transaction';
import LoadingIndicator from 'components/LoadingIndicator';
import NoOmniTransactions from 'components/NoOmniTransactions';
import ContainerBase from 'components/ContainerBase';
import FooterLinks from 'components/FooterLinks';

import injectSaga from 'utils/injectSaga';
import sagaTransactions from 'containers/Transactions/saga';

import { makeSelectLoading, makeSelectTransactions, makeSelectUnconfirmed } from './selectors';
import { loadTransactions, loadUnconfirmed, setPage, setTransactionType } from './actions';
import messages from './messages';

const StyledContainer = styled(ContainerBase)`
  overflow: auto;
  padding-bottom: 0;
`;

export class Transactions extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { page } = props.match.params;
    this.props.onSetPage(!page || isNaN(page) ? 0 : parseInt(page));
  }

  componentDidMount() {
    const unconfirmed = this.props.location.pathname.includes('unconfirmed');
    if (unconfirmed) {
      this.props.loadUnconfirmed();
    } else {
      this.props.loadTransactions(this.props.addr);
    }

    console.log('Transactions did mount');
  }

  render() {
    let content;

    if (this.props.loading) {
      content = <LoadingIndicator />;
    } else if ((this.props.transactions.transactions || []).length === 0) {
      content = <NoOmniTransactions />;
    } else {
      const pathname = this.props.addr ? `/address/${this.props.addr}` : '';
      const hashLink = v => `${pathname}/${v}`;
      const getItemKey = (item, idx) => item.txid.slice(0, 22).concat(idx);
      const { addr } = this.props;
      const usePagination = !this.props.unconfirmed;
      const props = {
        ...this.props.transactions,
        addr,
        inner: Transaction,
        onSetPage: this.props.onSetPage,
        hashLink,
        getItemKey,
        usePagination,
      };
      props.items = props.transactions;
      content = <List {...props} />;
    }
    const footer = <FooterLinks blocklist />;
    return (
      <StyledContainer fluid>
        <TransactionListHeader
          selectType={this.props.onSetTransactionType}
          total={this.props.transactions.pageCount}
          totalLabel="page"
          customHeader={(this.props.unconfirmed ? messages.unconfirmedHeader : null)}
        />
        {content}
        {footer}
      </StyledContainer>
    );
  }
}

Transactions.propTypes = {
  loadTransactions: PropTypes.func,
  loadUnconfirmed: PropTypes.func,
  transactions: PropTypes.object.isRequired,
  onSetPage: PropTypes.func,
  loading: PropTypes.bool,
  addr: PropTypes.string,
  unconfirmed: PropTypes.bool,
  match: PropTypes.object,
  onSetTransactionType: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
  loading: makeSelectLoading(),
  unconfirmed: makeSelectUnconfirmed(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadTransactions: addr => dispatch(loadTransactions(addr)),
    loadUnconfirmed: () => dispatch(loadUnconfirmed()),
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
