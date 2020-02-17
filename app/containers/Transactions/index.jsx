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
import styled from 'styled-components';
import List from 'components/List';
import TransactionListHeader from 'components/TransactionListHeader';
import Transaction from 'components/Transaction';
import LoadingIndicator from 'components/LoadingIndicator';
import NoOmniTransactions from 'components/NoOmniTransactions';
import ContainerBase from 'components/ContainerBase';
import FooterLinks from 'components/FooterLinks';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import history from 'utils/history';

import { Button, ButtonGroup } from 'reactstrap';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import {
  makeSelectLoading,
  makeSelectTransactions,
  makeSelectUnconfirmed,
} from './selectors';
import {
  loadTransactions,
  loadUnconfirmed,
  setPage,
  setTransactionType,
} from './actions';
import messages from './messages';

import saga from './saga';
import reducer from './reducer';

const StyledContainer = styled(ContainerBase)`
  overflow: auto;
  padding-bottom: 0;
`;

export function Transactions(props) {
  const unconfirmedTxs = props.location.pathname.includes('unconfirmed');
  const pageParam =
    props.match.params.page ||
    (unconfirmedTxs && props.transactions.currentPage) ||
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
    loadTxs(!unconfirmedTxs);
  }, [props.addr]);

  useEffect(() => {
    // load transactions when it's on unconfirmed page and the state wasn't updated, and when isn't unconfirmed page
    if (
      !props.loading &&
      (!props.transactions.stamp || unconfirmedTxs !== props.transactions.unconfirmed)
    ) {
      loadTxs(!unconfirmedTxs);
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

  const pathname = props.addr ? `/address/${props.addr}` : '';
  const hashLink = v => `${pathname}/${v}`;
  const loadTxs = confirmed =>
    (confirmed ? props.loadTransactions : props.loadUnconfirmed)(props.addr);

  const handlePageClick = page => {
    props.setCurrentPage(page);
    history.push(hashLink(page));
    loadTxs(true);
  };

  const onRadioBtnClick = confirmed => {
    history.push(hashLink(confirmed ? '' : 'unconfirmed'));
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
      inner: Transaction,
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
      customHeader={props.unconfirmed ? messages.unconfirmedHeader : null}
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
              onClick={() => onRadioBtnClick(true)}
              active={!props.unconfirmed}
              disabled={!props.unconfirmed}
            >
              Confirmed
            </Button>
            <Button
              onClick={() => onRadioBtnClick(false)}
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
