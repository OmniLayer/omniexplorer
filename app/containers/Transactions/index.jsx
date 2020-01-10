/* eslint-disable radix,no-restricted-globals */
/**
 *
 * Transactions
 *
 */

import React, { useEffect, useState } from 'react';
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

import { useInjectSaga } from 'utils/injectSaga';
import history from 'utils/history';
import sagaTransactions from 'containers/Transactions/saga';

import { Button, ButtonGroup } from 'reactstrap';
import { makeSelectLoading, makeSelectTransactions, makeSelectUnconfirmed } from './selectors';
import { loadTransactions, loadUnconfirmed, setPage, setTransactionType } from './actions';
import messages from './messages';

const StyledContainer = styled(ContainerBase)`
  overflow: auto;
  padding-bottom: 0;
`;

export function Transactions(props) {
  const [page, setPage] = useState(props.match.params.page);
  const unconfirmed = props.location.pathname.includes('unconfirmed');

  const [loadConfirmed, setLoadConfirmed] = useState(true);

  useInjectSaga({
    key: 'transactions',
    saga: sagaTransactions,
  });

  const pathname = props.addr ? `/address/${props.addr}` : '';
  const hashLink = v => `${pathname}/${v}`;
  const loadTxs = () => ((unconfirmed ? props.loadUnconfirmed : props.loadTransactions)(props.addr));

  useEffect(() => {
    loadTxs();
  }, [page, unconfirmed, props.addr]);

  const handlePageClick = p => {
    props.setCurrentPage(p);
    history.push(hashLink(p));
    setPage(p);
  };

  const onRadioBtnClick = confirmed => {
    setLoadConfirmed(confirmed);
    loadTxs();
  };

  let content;

  if (props.loading) {
    content = <LoadingIndicator />;
  } else if ((props.transactions.transactions || []).length === 0) {
    content = <NoOmniTransactions />;
  } else {
    const getItemKey = (item, idx) => item.txid.slice(0, 22).concat(idx);
    const { addr } = props;
    const usePagination = !props.unconfirmed;
    const _props = {
      ...props.transactions,
      addr,
      inner: Transaction,
      onSetPage: handlePageClick,
      currentPage: parseInt(page),
      hashLink,
      getItemKey,
      usePagination,
    };

    _props.items = props.transactions.transactions;
    content = <List {..._props} />;
  }
  const footer = <FooterLinks blocklist />;

  const header = (
    <TransactionListHeader
      customHeader={props.unconfirmed ? messages.unconfirmedHeader : null}
      totalPreText={
        props.unconfirmed && props.transactions ? 'Displaying the ' : null
      }
      selectType={props.onSetTransactionType}
      total={props.transactions.pageCount}
      totalLabel="page"
      count={props.unconfirmed ? messages.unconfirmedSuffix : null}
      extra={
        !!props.addr && (
          <ButtonGroup>
            <Button
              onClick={() => onRadioBtnClick(true)}
              active={!!loadConfirmed}
              disabled={!!loadConfirmed}
            >
              Confirmed
            </Button>
            <Button
              onClick={() => onRadioBtnClick(false)}
              active={!loadConfirmed}
              disabled={!loadConfirmed}
            >
              Unconfirmed
            </Button>
          </ButtonGroup>
        )
      }
    />
  );

  return (
    <StyledContainer fluid>
      {header}
      {content}
      {footer}
    </StyledContainer>
  );
}

Transactions.propTypes = {
  loadTransactions: PropTypes.func,
  loadUnconfirmed: PropTypes.func,
  transactions: PropTypes.object.isRequired,
  setCurrentPage: PropTypes.func,
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
    loadUnconfirmed: addr => dispatch(loadUnconfirmed(addr)),
    setCurrentPage: p => dispatch(setPage(p)),
    onSetTransactionType: txtype => dispatch(setTransactionType(txtype)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Transactions);
