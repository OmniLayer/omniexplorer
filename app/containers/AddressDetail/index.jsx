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
import { Col, Row } from 'reactstrap';

import ContainerBase from 'components/ContainerBase';
import Transactions from 'containers/Transactions';
import Wallet from 'components/Wallet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectAddressDetail from './selectors';
import reducer from './reducer';
import { loadAddress } from './actions';
import sagaAddress from './saga';

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
    <ContainerBase className="mt-3">
      <Row noGutters>
        <Col sm>
          <Wallet {...props.addressdetail} addr={address} />
        </Col>
      </Row>
      <Row noGutters>
        <Col sm>
          <Transactions addr={address} {...props} currentPage={1} />
        </Col>
      </Row>
    </ContainerBase>
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
