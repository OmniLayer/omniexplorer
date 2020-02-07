/**
 *
 * AddressDetail
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';

import Transactions from 'containers/Transactions';
import Wallet from 'components/Wallet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectAddressDetail from './selectors';
import reducer from './reducer';
import { loadAddress } from './actions';
import sagaAddress from './saga';

const Layout = styled(Container)`
  background-color: white;
  padding: 0;
`;

export function AddressDetail(props) {
  const { address } = props.match.params;

  useInjectReducer({
    key: 'addressDetail',
    reducer,
  });
  useInjectSaga({
    key: 'addressDetail',
    saga: sagaAddress,
  });

  useEffect(() => {
    props.loadAddress(address);
  }, [address]);

  if (props.loading) {
    return;
  }

  return (
    <Layout fluid>
      <Row>
        <Col sm>
          <Wallet {...props.addressdetail} addr={address} />
        </Col>
      </Row>
      <Row>
        <Col sm>
          <Transactions addr={address} {...props} currentPage={1} />
        </Col>
      </Row>
    </Layout>
  );
}

AddressDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadAddress: PropTypes.func,
  addressdetail: PropTypes.object.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  addressdetail: makeSelectAddressDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadAddress: addr => dispatch(loadAddress(addr)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(AddressDetail);
