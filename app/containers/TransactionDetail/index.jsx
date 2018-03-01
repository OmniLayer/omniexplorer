/**
 *
 * TransactionDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTransactionDetail from './selectors';
import reducer from './reducer';
import saga from './saga';

export class TransactionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card inverse style={{ backgroundColor: '#2A72B5', borderColor: '#2A72B5' }}>
        <CardHeader>Unconfirmed Transaction Warning</CardHeader>
        <CardBody style={{ backgroundColor: '#348FE2', borderColor: '#348FE2' }}>
          <CardText>This transaction is unconfirmed. It is impossible to know the validity of an Omni transaction before
            it is confirmed in the blockchain. This is because the Omni Layer relies on the order of transactions within
            the blockchain to determine validity. Once the transaction is confirmed, balances will be updated
            accordingly and you will be able to verify its validity.</CardText>
        </CardBody>
      </Card>
    );
  }
}

TransactionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transactiondetail: makeSelectTransactionDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'transactionDetail', reducer });
const withSaga = injectSaga({ key: 'transactionDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionDetail);
