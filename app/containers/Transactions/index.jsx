/* eslint-disable radix,no-restricted-globals */
/**
 *
 * Transactions
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import List from 'components/List';
import TransactionListHeader from 'components/TransactionListHeader';
import Transaction from 'components/Transaction';
import ClassABTransaction from 'components/ClassABTransaction';
import ContainerBase from 'components/ContainerBase';
import LoadingIndicator from 'components/LoadingIndicator';
import NoOmniTransactions from 'components/NoOmniTransactions';
import FooterLinks from 'components/FooterLinks';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import history from 'utils/history';
import { getSufixURL } from 'utils/getLocationPath';
import isTestnet from 'utils/isTestnet';

import { Button, ButtonGroup } from 'reactstrap';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';

import { TXS_CLASS_AB, TXCLASSAB_ADDRESS_MAINNET, TXCLASSAB_ADDRESS_TESTNET } from 'containers/App/constants';

import { makeSelectLoading, makeSelectTransactions, makeSelectUnconfirmed } from './selectors';
import { loadClassABTxs, loadTransactions, loadUnconfirmed, setPage, setTransactionType } from './actions';
import messages from './messages';

import saga from './saga';
import reducer from './reducer';
import { TRANSACTION_TYPE } from './constants';

export function Transactions(props) {
  const unconfirmedTxs = props.location.pathname.includes('unconfirmed');
  const classABTxs = props.location.pathname.toLowerCase().includes(TXS_CLASS_AB);

  const pageParam =
    props.match.params.page ||
    (unconfirmedTxs && props.transactions.currentPage) ||
    (classABTxs && props.transactions.currentPage) ||
    props.currentPage ||
    1;
  const maxPagesByMedia = getMaxPagesByMedia();

  props.setCurrentPage(pageParam);

  useInjectSaga({
    key: 'transactions',
    saga,
  });
  useInjectReducer({
    key: 'transactions',
    reducer,
  });

  useEffect(() => {
    // load transactions on every change address
    if (!classABTxs) {
      loadTxs(
        unconfirmedTxs
          ? TRANSACTION_TYPE.UNCONFIRMED
          : TRANSACTION_TYPE.CONFIRMED,
      );
    }
  }, [props.addr]);

  useEffect(() => {
    // load class AB transactions when it's selected
    if (!props.transactions.stamp && classABTxs) {
      loadTxs(TRANSACTION_TYPE.CLASSABTX);
    }
  }, [classABTxs, pageParam]);

  useEffect(() => {
    // load transactions when it's on unconfirmed page and the state wasn't updated, and when isn't unconfirmed page
    if (
      !props.loading &&
      !classABTxs &&
      (!props.transactions.stamp ||
        unconfirmedTxs !== props.transactions.unconfirmed)
    ) {
      loadTxs(
        unconfirmedTxs
          ? TRANSACTION_TYPE.UNCONFIRMED
          : TRANSACTION_TYPE.CONFIRMED,
      );
    }
  }, [unconfirmedTxs, pageParam, unconfirmedTxs && !props.addr]);

  const getCurrentData = page => {
    const { transactions } = props.transactions;

    const start =
      transactions.length > maxPagesByMedia
        ? ((page || pageParam) - 1) * maxPagesByMedia
        : 0;
    const end =
      transactions.length > maxPagesByMedia
        ? ((page || pageParam) - 1) * maxPagesByMedia + maxPagesByMedia
        : maxPagesByMedia;
    return transactions.slice(start, end);
  };
  const getTransactions = () => props.transactions.transactions;
  const unconfirmedHandlePageClick = page => {
    props.setCurrentPage(page);
  };

  const pathname = props.addr ? `${getSufixURL()}/address/${props.addr}` : `${getSufixURL()}`;
  const hashLink = v => classABTxs ? `${pathname}/${TXS_CLASS_AB}/${v}` : `${pathname}/${v}`;
  // const loadTxs = confirmed =>
  //   (confirmed ? props.loadTransactions : props.loadUnconfirmed)(props.addr);
  const loadTxs = txType => {
    switch (txType) {
      case TRANSACTION_TYPE.CONFIRMED:
        props.loadTransactions(props.addr);
        break;
      case TRANSACTION_TYPE.UNCONFIRMED:
        props.loadUnconfirmed(props.addr);
        break;
      case TRANSACTION_TYPE.CLASSABTX:
        props.loadClassABTxs(isTestnet ? TXCLASSAB_ADDRESS_TESTNET : TXCLASSAB_ADDRESS_MAINNET);
        break;
    }
  };

  const handlePageClick = page => {
    props.setCurrentPage(page);
    history.push(hashLink(page));
    loadTxs(TRANSACTION_TYPE.CONFIRMED);
  };

  const onRadioBtnClick = txType => {
    // history.push(hashLink(confirmed ? '' : 'unconfirmed'));
    history.push(hashLink(txType !== TRANSACTION_TYPE.CONFIRMED ? txType : ''));
  };

  let content;

  if (props.loading) {
    content = <LoadingIndicator />;
  } else if ((getTransactions() || []).length === 0) {
    content = <NoOmniTransactions />;
  } else {
    const getItemKey = (item, idx) => item.txid.slice(0, 22).concat(idx);
    const { addr } = props;
    const usePagination = true;

    const _props = {
      ...props.transactions,
      addr,
      inner: Transaction, //classABTxs ? ClassABTransaction : Transaction,
      onSetPage: props.unconfirmed
        ? unconfirmedHandlePageClick
        : (classABTxs ? unconfirmedHandlePageClick : handlePageClick),
      currentPage: props.transactions.currentPage,
      hashLink,
      getItemKey,
      usePagination,
    };

    _props.items = getCurrentData(props.transactions.currentPage);
    content = <List {..._props} />;
  }
  const footer = <FooterLinks blocklist />;

  const header = (
    <TransactionListHeader
      customHeader={
        props.unconfirmed
          ? messages.unconfirmedHeader
          : {
            id: 'app.components.Transactions.unconfirmedHeader',
            defaultMessage: `${props.transactions.txCount} Transactions`,
          }
      }
      totalPreText={
        props.unconfirmed && props.transactions ? 'Displaying the ' : null
      }
      selectType={props.onSetTransactionType}
      total={
        props.unconfirmed
          ? props.transactions.transactions.length
          : props.transactions.pageCount
      }
      totalLabel="page"
      count={props.unconfirmed ? messages.unconfirmedSuffix : null}
      extra={
        !!props.addr && (
          <ButtonGroup>
            <Button
              onClick={() => onRadioBtnClick(TRANSACTION_TYPE.CONFIRMED)}
              active={!props.unconfirmed && !classABTxs}
              disabled={!props.unconfirmed && !classABTxs}
            >
              Confirmed
            </Button>
            <Button
              onClick={() => onRadioBtnClick(TRANSACTION_TYPE.UNCONFIRMED)}
              active={!!props.unconfirmed}
              disabled={!!props.unconfirmed}
            >
              Unconfirmed
            </Button>
          </ButtonGroup>
        )
      }
    />
  );

  return (
    <ContainerBase>
      {header}
      {content}
      {footer}
    </ContainerBase>
  );
}

Transactions.propTypes = {
  loadTransactions: PropTypes.func,
  loadUnconfirmed: PropTypes.func,
  loadClassABTxs: PropTypes.func,
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
    loadClassABTxs: addr => dispatch(loadClassABTxs(addr)),
    setCurrentPage: p => dispatch(setPage(p)),
    onSetTransactionType: txtype => dispatch(setTransactionType(txtype)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Transactions);
