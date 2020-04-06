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
import { loadActivations } from 'containers/Activations/actions';
import { makeSelectActivations } from 'containers/Activations/selectors';
import { FEATURE_ACTIVATION_TYPE_INT } from 'containers/App/constants';

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
    if (
      (!props.tokens.lastFetched || isActivation()) &&
      !props.txdetail.loading
    ) {
      if (isActivation()) {
        props.loadActivations();
      } else {
        props.getProperty(props.txdetail.transaction.propertyid);
      }
    }
  }, [props.txdetail.loading]);

  const loading = (
    <Container>
      <LoadingIndicator />
    </Container>
  );

  const isActivation = () =>
    props.txdetail.transaction.type_int === FEATURE_ACTIVATION_TYPE_INT;

  if (
    props.txdetail.loading ||
    (!isActivation() && props.tokens.isFetching) ||
    (isActivation() && props.activations.loading)
  ) {
    return loading;
  }

  const property = getPropByTx(
    props.txdetail.transaction,
    isActivation()
      ? feat => feat.featureid === props.txdetail.transaction.featureid
      : id => props.tokens[id],
    props.activations.list,
  );
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
  loadActivations: PropTypes.func.isRequired,
  tokens: PropTypes.any,
  activations: PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadTransaction: (addr, page) => dispatch(loadTransaction(addr, page)),
    getProperty: propertyId => dispatch(startFetch(propertyId)),
    loadActivations: () => dispatch(loadActivations()),
  };
}

const mapStateToProps = createStructuredSelector({
  txdetail: makeSelectTransactionDetail(),
  tokens: makeSelectProperties(),
  activations: makeSelectActivations(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TransactionDetail);
