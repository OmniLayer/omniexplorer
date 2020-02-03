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
import isEmpty from 'lodash/isEmpty';

const StyledContainer = styled(ContainerBase)`
  overflow: auto;
  padding-bottom: 0;
`;

export function Transactions(props) {
  const [page, setPage] = useState(props.match.params.page);
  const unconfirmed = props.location.pathname.includes('unconfirmed');
  const maxPagesByMedia = window.matchMedia('(max-width: 500px)').matches
    ? 5
    : 10;
  const [loadConfirmed, setLoadConfirmed] = useState(!unconfirmed);

  /**
   * unconfirmed pagination
   * <BEGIN>
   */
  const [transactions, setTransactions] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getTransactions = () => {
    console.log('call getTransactions');

    const { transactions: txs } = props.transactions;

    if (isEmpty(transactions)) {
      setCurrentPage(parseInt(props.location.hash.replace('#', ''), maxPagesByMedia) || 1);
      setCurrentData(txs.slice(0, maxPagesByMedia));
      setPageCount(Math.ceil(txs.length / maxPagesByMedia));

      setTransactions(txs);
    }

    return transactions;
  };

  const unconfirmedHandlePageClick = page => {
    const txs = getTransactions();
    setCurrentPage(page);
    setCurrentData(txs.slice((page - 1) * maxPagesByMedia, (page - 1) * maxPagesByMedia + maxPagesByMedia));
  };
  /**
   * <END>
   */
  useInjectSaga({
    key: 'transactions',
    saga: sagaTransactions,
  });

  const pathname = props.addr ? `/address/${props.addr}` : '';
  const hashLink = v => `${pathname}/${v}`;
  const loadTxs = () => ((loadConfirmed ? props.loadTransactions : props.loadUnconfirmed)(props.addr));

  useEffect(() => {
    loadTxs();
  }, [page, loadConfirmed, props.addr]);

  const handlePageClick = p => {
    props.setCurrentPage(p);
    history.push(hashLink(p));
    setPage(p);
  };

  const onRadioBtnClick = confirmed => {
    setLoadConfirmed(confirmed);
    // loadTxs();
  };

  let content;

  if (props.loading) {
    content = <LoadingIndicator />;
  } else if ((props.transactions.transactions || []).length === 0) {
    content = <NoOmniTransactions />;
  } else {
    const txs = getTransactions();
    const getItemKey = (item, idx) => item.txid.slice(0, 22).concat(idx);
    const { addr } = props;
    const usePagination = true; // !props.unconfirmed;
    const _props = {
      ...props.transactions,
      addr,
      inner: Transaction,
      onSetPage: props.unconfirmed ? unconfirmedHandlePageClick : handlePageClick,
      currentPage: props.unconfirmed ? currentPage : parseInt(page),
      hashLink,
      getItemKey,
      usePagination,
    };

    _props.items = props.unconfirmed ? currentData : props.transactions.transactions;
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
      total={props.unconfirmed ? pageCount : props.transactions.pageCount}
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
