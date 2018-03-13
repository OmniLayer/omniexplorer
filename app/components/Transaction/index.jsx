/**
 *
 * Transaction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeActions } from 'redux-simple-router';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

import ArrowIcon from 'react-icons/lib/io/arrow-right-c';
import { CONFIRMATIONS } from 'containers/Transactions/constants';
import './transaction.scss';

const IMG = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 7px;
`;

class Transaction extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const isValid = this.props.valid;
    const status = (
      isValid ?
        this.props.confirmations < CONFIRMATIONS ?
            this.props.confirmations === 0 ?
               'UNCONFIRMED' :
                this.props.confirmations > 1 ?
                   `${this.props.confirmations} CONFIRMATIONS` :
                   `${this.props.confirmations} CONFIRMATION`
        :
            'CONFIRMED'
      :
        'INVALID'
    );

    let tokenLogo;
    try {
      tokenLogo = require(`images/token${this.props.propertyid}.png`);
    } catch (e) {
      if (this.props.type_int === 4) {
        tokenLogo = require('images/sendall.png');
      } else {
        tokenLogo = require('images/tokendefault.png');
      }
    }

    let arrowcname;
    let addresscname;
    if ( this.props.referenceaddress !== undefined ) {
      arrowcname = 'transaction-arrow-icon';
      addresscname = 'btn btn-add m-r-5 m-b-5';
    } else {
      arrowcname = 'd-none';
      addresscname = 'd-none';
    }

    return (
      <Row className="transation-result mx-auto">
        <Col xs="9">
          <Row className="transaction-header">
            <Col sm="1">
              <IMG src={tokenLogo} />
            </Col>
            <Col>
              <Row>
                <span className="title">
                  { this.props.type }
                </span>
              </Row>
              <Row>
                <div className="location">
                  <Link
                    to={{
                      pathname: `/tx/${this.props.txid}`,
                      state: { transaction: this.props },
                    }}
                    onClick={() => this.props.changeRoute(`/tx/${this.props.txid}`)}
                  >
                    { this.props.txid.slice(0, 48) }...
                  </Link>
                </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="desc">
                <Link
                  className="btn btn-add m-r-5 m-b-5"
                  to={{
                    pathname: `/address/${this.props.sendingaddress}`,
                  }}
                  onClick={() => this.props.changeRoute(`/address/${this.props.sendingaddress}`)}
                >
                  { this.props.sendingaddress }
                </Link>
                <ArrowIcon size={20} color="gray" className={ arrowcname } />
                <Link
                  className={ addresscname }
                  to={{
                    pathname: `/address/${this.props.referenceaddress}`,
                  }}
                  onClick={() => this.props.changeRoute(`/address/${this.props.referenceaddress}`)}
                >
                  { this.props.referenceaddress }
                </Link>
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs="3" className="result-price text-center">
          <Row>
            <Col>
              <h4 className="title">
                { this.props.amount }
              </h4>
            </Col>
          </Row>
          <Row className="transaction-asset">
            <Col>
              <small>{ this.props.propertyname } (#{ this.props.propertyid })</small>
            </Col>
          </Row>
          <Row>
            <Col className="btn-group">
              <Link
                className="btn btn-primary btn-block btn-blue font-weight-light"
                to={{
                  pathname: `/tx/${this.props.txid}`,
                }}
                onClick={() => this.props.changeRoute(`/tx/${this.props.txid}`)}
              >
                { status }
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Transaction.propTypes = {
  sendingaddress: PropTypes.string,
  referenceaddress: PropTypes.string,
  confirmations: PropTypes.number,
  type: PropTypes.string,
  txid: PropTypes.string,
  amount: PropTypes.string,
  changeRoute: PropTypes.func,
  valid: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Transaction);
