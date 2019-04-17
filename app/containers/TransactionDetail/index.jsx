/**
 *
 * TransactionDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Container } from 'reactstrap';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import getWarningMessage from 'utils/getWarningMessage';
import getPropByTx from 'utils/getPropByTx';

import LoadingIndicator from 'components/LoadingIndicator';
import TransactionInfo from 'components/TransactionInfo';
import ContainerBase from 'components/ContainerBase';
import { startFetch } from 'components/Token/actions';
import { makeSelectProperties, makeSelectProperty } from 'components/Token/selectors';

import makeSelectTransactionDetail from './selectors';
import sagaTxDetail from './saga';
import { loadTransaction } from './actions';
import reducer from './reducer';

export class TransactionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.txid = this.props.match.params.tx.toString();
    this.props.loadTransaction(this.txid);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.txdetail.loading && !this.props.tokens.isFetching && !this.props.tokens.lastFetched) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
      this.props.getProperty(this.props.txdetail.transaction.propertyid);
    }
  }

  render() {
    const loading = (
      <Container>
        <LoadingIndicator />
      </Container>
    );

    if (this.props.txdetail.loading) {
      return loading;
    }

    const property = getPropByTx(this.props.txdetail.transaction, this.props.properties);
    if (!property) return loading;

    if (this.props.txdetail.transaction.notFound) {
      return (
        <ContainerBase fluid>
          <h1> Transaction
            <small> {this.txid.slice(0, 24)}... </small>
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
        <TransactionInfo {...this.props.txdetail.transaction} asset={property}/>
      </ContainerBase>
    );
  }
}

TransactionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadTransaction: PropTypes.func,
  txdetail: PropTypes.object,
  getProperty: PropTypes.func.isRequired,
  properties: PropTypes.func.isRequired,
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
  properties: state => makeSelectProperty(state),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'transactionDetail',
  reducer,
});
const withSaga = injectSaga({
  key: 'transactionDetail',
  saga: sagaTxDetail,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionDetail);
