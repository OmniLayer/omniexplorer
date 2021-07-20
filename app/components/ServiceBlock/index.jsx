/**
 *
 * ServiceBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import featureLogoPNG from 'images/token1.png';
import { Col, Row } from 'reactstrap';
import { makeSelectStatus } from './selectors';
import isOmniFeather from 'utils/isOmniFeather';
const ftcLogo = require(`images/external_logos/token0.png`);

const IMG = styled.img`
  margin-right: 6px;
  width: 60px;
  height: 60px;
`;

const Container = styled.div.attrs({
  className: 'service-block text-center-down-md text-white lead',
})`
  padding: 15px;
`;

const BlockTitle = styled.span.attrs({
  className: "d-block",
})`
  font-size: 0.9rem;
`;

class ServiceBlock extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    // wait status props loading
    if (isEmpty(this.props) || isEmpty(this.props.status)) {
      return null;
    }

    const propertiesCountValue = props => (
      <span>
        {props.properties_count}
        <small>{` (+${props.test_properties_count} test)`}</small>
      </span>
    );

    const omniPriceValue = props => (
      <span>
        {Math.round((props.omni_btc + 0.0000001) * 1000000) / 1000000} BTC / $
        {(Math.round((props.omni_usd + 0.00001) * 100) / 100).toFixed(2)}
      </span>
    );

    return (
      <Container>
        <Row xs="1" sm="1" md="5">
          <Col className="mt-3 mt-sm-0">
            {!isOmniFeather && (
              <IMG src={featureLogoPNG} alt="OmniExplorer.info" />
            )}
            {isOmniFeather && (
              <IMG src={ftcLogo} alt="OmniFeather Explorer" />
            )}
            <div className="d-sm-block d-md-inline-block text-whites align-middle">
              <h5>{(isOmniFeather ? 'FeatherCoin (#0)' : 'Omni Token (#1)')}</h5>
              <span>Featured Property</span>
            </div>
          </Col>
          <Col className="mt-3 mt-sm-0">
            <BlockTitle>LAST UPDATE</BlockTitle>
            <span className="d-block">{`As of Block ${this.props.status.last_block}`}</span>
            <small className="d-block">{`${this.props.status.block_time} UTC`}</small>
          </Col>
          <Col className="mt-3 mt-sm-0">
            <BlockTitle>LATEST OMNI EXCHANGE RATE</BlockTitle>
            <span>{omniPriceValue(this.props.status)}</span>
          </Col>
          <Col className="mt-3 mt-sm-0">
            <BlockTitle>TOTAL TRANSACTIONS (24 hrs)</BlockTitle>
            <span>{this.props.status.txcount_24hr}</span>
          </Col>
          <Col className="mt-3 mt-sm-0">
            <BlockTitle>OMNI PROPERTIES</BlockTitle>
            <span>{propertiesCountValue(this.props.status)}</span>
          </Col>
        </Row>
      </Container>
    );
  }
}

ServiceBlock.propTypes = {
  getStatus: PropTypes.func,
  status: PropTypes.object,
  last_block: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(withConnect)(ServiceBlock);
