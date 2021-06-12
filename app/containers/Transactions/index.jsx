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
import isNil from 'lodash/isNil';
import List from 'components/List';
import TransactionListHeader from 'components/TransactionListHeader';
import Transaction from 'components/Transaction';
import ContainerBase from 'components/ContainerBase';
import LoadingIndicator from 'components/LoadingIndicator';
import NoOmniTransactions from 'components/NoOmniTransactions';
import FooterLinks from 'components/FooterLinks';
import { startFetchMany } from 'components/Token/actions';
import {
  makeSelectHasProperty,
  makeSelectLastFetched,
  makeSelectLoadingTokens,
  makeSelectProperties,
} from 'components/Token/selectors';
import { loadActivations } from 'containers/Activations/actions';
import { makeSelectActivations } from 'containers/Activations/selectors';
import {
  FEATURE_ACTIVATION_TYPE_INT,
  TXCLASSAB_ADDRESS_MAINNET,
  TXCLASSAB_ADDRESS_TESTNET,
  TXS_CLASS_AB,
} from 'containers/App/constants';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import history from 'utils/history';
import { getSufixURL } from 'utils/getLocationPath';
import isTestnet from 'utils/isTestnet';

import { Button, ButtonGroup } from 'reactstrap';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';

import { makeSelectLoading, makeSelectTransactions, makeSelectUnconfirmed } from './selectors';
import { loadClassABTxs, loadTransactions, loadUnconfirmed, setPage, setTransactionType } from './actions';
import messages from './messages';

import saga from './saga';
import reducer from './reducer';
import { TRANSACTION_TYPE } from './constants';

export function Transactions(props) {
  const unconfirmedTxs = props.location.pathname.includes('unconfirmed');
  const classABTxs = props.location.pathname
    .toLowerCase()
    .includes(TXS_CLASS_AB);

  const currentPage = () =>
    props.match.params.page ||
    (unconfirmedTxs && props.transactions.currentPage) ||
    (classABTxs && props.transactions.currentPage) ||
    props.currentPage;

  const maxPagesByMedia = getMaxPagesByMedia();

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
      props.setCurrentPage(currentPage() || 1);
      loadTxs(
        unconfirmedTxs
          ? TRANSACTION_TYPE.UNCONFIRMED
          : TRANSACTION_TYPE.CONFIRMED,
      );
    }
  }, [props.addr, isNil(props.match.params.page)]);

  useEffect(() => {
    // load class AB transactions when it's selected
    if (!props.transactions.stamp && classABTxs) {
      loadTxs(TRANSACTION_TYPE.CLASSABTX);
    }
  }, [classABTxs, currentPage()]);

  useEffect(() => {
    // load transactions when it's on unconfirmed page and the state wasn't updated, and when isn't unconfirmed page
    if (
      !props.loading &&
      !classABTxs &&
      (!props.transactions.stamp ||
        (unconfirmedTxs !== props.transactions.unconfirmed &&
          props.unconfirmed) ||
        !props.unconfirmed)
    ) {
      // props.setCurrentPage(+pageParam || 1);
      props.setCurrentPage(currentPage() || 1);
      loadTxs(
        unconfirmedTxs
          ? TRANSACTION_TYPE.UNCONFIRMED
          : TRANSACTION_TYPE.CONFIRMED,
      );
    }
  }, [unconfirmedTxs, currentPage(), unconfirmedTxs && !props.addr]);

  const getCurrentData = page => {
    const maxResults = 10;
    const { transactions } = props.transactions;

    const start =
      transactions.length > maxResults
        ? ((page || currentPage()) - 1) * maxResults
        : 0;

    const end =
      transactions.length > maxResults
        ? ((page || currentPage()) - 1) * maxResults + maxResults
        : maxResults;

    return transactions.slice(start, end);
  };
  const getTransactions = () => props.transactions.transactions;
  const unconfirmedHandlePageClick = page => {
    props.setCurrentPage(page);
  };

  const pathname = props.addr
    ? `${getSufixURL()}/address/${props.addr}`
    : `${getSufixURL()}`;

  const hashLink = v =>
    classABTxs ? `${pathname}/${TXS_CLASS_AB}/${v}` : `${pathname}/${v}`;

  const loadTxs = txType => {
    switch (txType) {
      case TRANSACTION_TYPE.CONFIRMED:
        props.loadTransactions(props.addr);
        break;
      case TRANSACTION_TYPE.UNCONFIRMED:
        props.loadUnconfirmed(props.addr);
        break;
      case TRANSACTION_TYPE.CLASSABTX:
        props.loadClassABTxs(
          isTestnet ? TXCLASSAB_ADDRESS_TESTNET : TXCLASSAB_ADDRESS_MAINNET,
        );
        break;
    }
  };

  const handlePageClick = page => {
    props.setCurrentPage(page);
    history.push(hashLink(page));
    loadTxs(TRANSACTION_TYPE.CONFIRMED);
  };

  const onRadioBtnClick = txType => {
    history.push(hashLink(txType !== TRANSACTION_TYPE.CONFIRMED ? txType : ''));
  };

  let content;

  if (props.loading || props.loadingTokens) {
    content = <LoadingIndicator />;
  } else if ((getTransactions() || []).length === 0) {
    content = <NoOmniTransactions />;
  } else {
    // const {transactions: txs} = props.transactions;
    const needFetchTokens = getTransactions().some(
      b => b.propertyid && !props.hasPropertyFetched(b.propertyid),
    );
    if (needFetchTokens || (!props.loadingTokens && !props.lastFetched)) {
      const propertiesToFetch = getTransactions().filter(tx => tx.propertyid).map(tx => tx.propertyid);
      props.getProperties(propertiesToFetch);
      return (<LoadingIndicator />);
    }

    const needFetchActivations = getTransactions().some(
      tx => tx.type_int === FEATURE_ACTIVATION_TYPE_INT && !props.activations.list.length,
    );
    if (needFetchActivations) {
      if (!props.activations.loading && !props.activations.list.length) {
        props.loadActivations();
      }
      return (<LoadingIndicator />);
    }

    const getItemKey = (item, idx) => item.txid.slice(0, 22).concat(idx);
    const { addr } = props;
    const usePagination = true;

    const _props = {
      ...props.transactions,
      addr,
      inner: Transaction,
      onSetPage: props.unconfirmed
        ? unconfirmedHandlePageClick
        : classABTxs
          ? unconfirmedHandlePageClick
          : handlePageClick,
      currentPage: props.transactions.currentPage,
      hashLink,
      getItemKey,
      usePagination,
    };

    const mergePropertyFlags = property => (property.propertyid ? {
      ...property,
      flags: (props.tokens[property.propertyid] || { flags: {} }).flags,
    } : property);
    _props.items = getCurrentData(props.transactions.currentPage).map(x => mergePropertyFlags(x));
    content = <List {..._props} />;
  }
  const footer = <FooterLinks blocklist />;
  const headerMessage = () => {
    let result;

    if (props.unconfirmed) {
      result = messages.unconfirmedHeader;
    } else if (classABTxs) {
      result = messages.classABTxsHeader;
    } else {
      result = {
        id: 'app.components.Transactions.unconfirmedHeader',
        defaultMessage: `${props.transactions.txCount} Transactions`,
      };
    }

    return result;
  };

  const header = (
    <TransactionListHeader
      customHeader={headerMessage()}
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
  currentPage: PropTypes.any,
  loading: PropTypes.bool,
  location: PropTypes.object,
  addr: PropTypes.string,
  unconfirmed: PropTypes.bool,
  match: PropTypes.object,
  onSetTransactionType: PropTypes.func,
  getProperties: PropTypes.func,
  loadActivations: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
  loading: makeSelectLoading(),
  unconfirmed: makeSelectUnconfirmed(),
  lastFetched: makeSelectLastFetched(),
  loadingTokens: makeSelectLoadingTokens(),
  tokens: makeSelectProperties(),
  hasPropertyFetched: makeSelectHasProperty,
  activations: makeSelectActivations(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadTransactions: addr => dispatch(loadTransactions(addr)),
    loadUnconfirmed: addr => dispatch(loadUnconfirmed(addr)),
    loadClassABTxs: addr => dispatch(loadClassABTxs(addr)),
    setCurrentPage: p => dispatch(setPage(p)),
    onSetTransactionType: txtype => dispatch(setTransactionType(txtype)),
    getProperties: propIdList => dispatch(startFetchMany(propIdList)),
    loadActivations: () => dispatch(loadActivations()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Transactions);
