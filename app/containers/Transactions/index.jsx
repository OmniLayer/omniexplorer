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
import ExodusTransaction from 'components/ExodusTransaction';
import ContainerBase from 'components/ContainerBase';
import LoadingIndicator from 'components/LoadingIndicator';
import NoOmniTransactions from 'components/NoOmniTransactions';
import FooterLinks from 'components/FooterLinks';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import history from 'utils/history';
import { getSufixURL } from 'utils/getLocationPath';

import { Button, ButtonGroup } from 'reactstrap';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';

import { EXODUS_TXS_CLASS_AB, EXODUS_ADDRESS } from 'containers/App/constants';

import { makeSelectLoading, makeSelectTransactions, makeSelectUnconfirmed } from './selectors';
import { loadExodusTxs, loadTransactions, loadUnconfirmed, setPage, setTransactionType } from './actions';
import messages from './messages';

import saga from './saga';
import reducer from './reducer';
import { TRANSACTION_TYPE } from './constants';

export function Transactions(props) {
  const unconfirmedTxs = props.location.pathname.includes('unconfirmed');
  const exodusTxs = props.location.pathname.toLowerCase().includes(EXODUS_TXS_CLASS_AB);

  const pageParam =
    props.match.params.page ||
    (unconfirmedTxs && props.transactions.currentPage) ||
    (exodusTxs && props.currentPage) ||
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
    if (!exodusTxs) {
      loadTxs(
        unconfirmedTxs
          ? TRANSACTION_TYPE.UNCONFIRMED
          : TRANSACTION_TYPE.CONFIRMED,
      );
    }
  }, [props.addr]);

  useEffect(() => {
    // load exodus transactions when it's selected
    if (exodusTxs) {
      loadTxs(TRANSACTION_TYPE.EXODUS);
    }
  }, [exodusTxs, props.addr]);

  useEffect(() => {
    // load transactions when it's on unconfirmed page and the state wasn't updated, and when isn't unconfirmed page
    if (
      !props.loading &&
      !exodusTxs &&
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
  const hashLink = v => `${pathname}/${v}`;
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
      case TRANSACTION_TYPE.EXODUS:
        props.loadExodusTxs(EXODUS_ADDRESS);
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
      inner: exodusTxs ? ExodusTransaction : Transaction,
      onSetPage: props.unconfirmed
        ? unconfirmedHandlePageClick
        : handlePageClick,
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
      sx={{ backgroundColor: 'whitesmoke' }}
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
              active={!props.unconfirmed && !exodusTxs}
              disabled={!props.unconfirmed && !exodusTxs}
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
  loadExodusTxs: PropTypes.func,
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
    loadExodusTxs: addr => dispatch(loadExodusTxs(addr)),
    setCurrentPage: p => dispatch(setPage(p)),
    onSetTransactionType: txtype => dispatch(setTransactionType(txtype)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Transactions);
