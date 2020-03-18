/**
 *
 * TransactionDetail
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Container } from 'reactstrap';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import getWarningMessage from 'utils/getWarningMessage';
import getPropByTx from 'utils/getPropByTx';

import LoadingIndicator from 'components/LoadingIndicator';
import TransactionInfo from 'components/TransactionInfo';
import ContainerBase from 'components/ContainerBase';
import { startFetch } from 'components/Token/actions';
import { makeSelectProperties } from 'components/Token/selectors';

import makeSelectTransactionDetail from './selectors';
import sagaTxDetail from './saga';
import { loadTransaction } from './actions';
import reducer from './reducer';

export function TransactionDetail(props) {
  const { tx } = props.match.params;

  useInjectSaga({
    key: 'transactionDetail',
    saga: sagaTxDetail,
  });

  useInjectReducer({
    key: 'transactionDetail',
    reducer,
  });

  useEffect(() => {
    props.loadTransaction(tx);
  }, [tx]);

  useEffect(() => {
    if (!props.tokens.lastFetched && !props.txdetail.loading && props.txdetail.transaction.propertyid) {
      props.getProperty(props.txdetail.transaction.propertyid);
    }
  }, [props.txdetail.loading]);

  const loading = (
    <Container>
      <LoadingIndicator />
    </Container>
  );

  if (props.txdetail.loading || props.tokens.isFetching) {
    return loading;
  }

  const property = getPropByTx(props.txdetail.transaction, id => props.tokens[id]);
  if (!property) return loading;

  if (props.txdetail.transaction.notFound) {
    return (
      <ContainerBase fluid>
        <h1>
          {' '}
          Transaction
          <small> {tx.slice(0, 24)}... </small>
          not found
        </h1>
      </ContainerBase>
    );
  }

  const warningMessage = getWarningMessage(
    property.flags,
    property.name || property.propertyname,
    property.propertyid,
  );

  return (
    <ContainerBase fluid>
      {warningMessage}
      <TransactionInfo {...props.txdetail.transaction} asset={property} />
    </ContainerBase>
  );
}

TransactionDetail.propTypes = {
  match: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  loadTransaction: PropTypes.func,
  txdetail: PropTypes.object,
  getProperty: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadTransaction: (addr, page) => dispatch(loadTransaction(addr, page)),
    getProperty: propertyId => dispatch(startFetch(propertyId)),
  };
}

const mapStateToProps = createStructuredSelector({
  txdetail: makeSelectTransactionDetail(),
  tokens: makeSelectProperties(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(TransactionDetail);
