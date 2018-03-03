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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import TransactionList from 'components/TransactionList';
import TransactionListHeader from 'components/TransactionListHeader';
import ListPagination from 'components/ListPagination';

import LoadingIndicator from 'components/LoadingIndicator';

import { makeSelectTransactions, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadTransactions, setPage } from './actions';

export class Transactions extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadTransactions(this.props.addr);
  }

  render() {
    const StyledContainer = styled(Container)`
      background-color: #F0F3F4;
    `;

    if (this.props.loading) {
      return (
        <StyledContainer fluid>
          <TransactionListHeader />
          <LoadingIndicator />
        </StyledContainer>
      );
    }

    return (
      <StyledContainer fluid>
        <TransactionListHeader />
        <ListPagination {...this.props.transactions} onSetPage={this.props.onSetPage} />
        <TransactionList {...this.props.transactions} />
        <ListPagination {...this.props.transactions} onSetPage={this.props.onSetPage} />
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
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadTransactions: (addr) => dispatch(loadTransactions(addr)),
    dispatch,
    onSetPage: (p) => dispatch(setPage(p)),
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
