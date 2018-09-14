/**
 *
 * AddressDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';

import Transactions from 'containers/Transactions';
import Wallet from 'components/Wallet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import sagaTransactions from 'containers/Transactions/saga';
import makeSelectAddressDetail from './selectors';
import reducer from './reducer';
import { loadAddress } from './actions';
import sagaAddress from './saga';

const Layout = styled(Container)`
      background-color: white;
      padding: 0;
    `;

export class AddressDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.address = this.props.match.params.address.toString();
  }

  componentDidMount() {
    console.log('address detail did mount');
    this.props.loadAddress(this.address);
  }

  render() {
    console.log('address detail render');
    if (this.props.loading) {
      return;
    }

    return (
      <Layout fluid>
        <Row>
          <Col sm>
            <Wallet {...this.props.addressdetail} addr={this.address} />
          </Col>
        </Row>
        <Row>
          <Col sm>
            <Transactions addr={this.address} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

AddressDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadAddress: PropTypes.func,
  addressdetail: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addressdetail: makeSelectAddressDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadAddress: (addr) => dispatch(loadAddress(addr)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'addressDetail', reducer });

const withSagaAddress = injectSaga({ key: 'addressDetail', saga: sagaAddress });
const withSagaTransaction = injectSaga({ key: 'transactions', saga: sagaTransactions });


export default compose(
  withReducer,
  withSagaAddress,
  withSagaTransaction,
  withConnect,
)(AddressDetail);
