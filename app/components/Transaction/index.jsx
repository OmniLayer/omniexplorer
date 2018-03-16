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
import Moment from 'react-moment';

import ArrowIcon from 'react-icons/lib/io/arrow-right-c';
import { CONFIRMATIONS } from 'containers/Transactions/constants';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import './transaction.scss';

const IMG = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 7px;
`;

class Transaction extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const isValid = this.props.valid;
    
    const statusColor = (isValid ? 'btn btn-primary btn-block btn-blue font-weight-light' : (this.props.confirmations === 0 ? 'btn btn-primary btn-block btn-warning font-weight-light' : 'btn btn-primary btn-block btn-danger font-weight-light'));
    
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
        this.props.confirmations === 0 ?
          'UNCONFIRMED' :
          'INVALID'
    );
    
    let tokenLogo;
    try {
      tokenLogo = require(`images/token${this.props.propertyid}.png`);
    } catch(e) {
      if (this.props.type_int === 4) {
        tokenLogo = require('images/sendall.png');
      } else {
        tokenLogo = require('images/tokendefault.png');
      }
    }
    
    let arrowcname;
    let addresscname;
    if (this.props.referenceaddress !== undefined) {
      arrowcname = 'transaction-arrow-icon';
      addresscname = 'btn btn-add w-100-down-md';
    } else {
      arrowcname = 'd-none';
      addresscname = 'd-none';
    }
    
    const transactionAmount = (this.props.amount ? this.props.amount.slice(0, this.props.amount.indexOf('.') + 7) : '');
    
    return (
      <Row className="transation-result mx-auto text-center-down-md">
        <Col sm="9">
          <Row className="transaction-header">
            <Col sm="2" md="1">
              <IMG src={tokenLogo}/>
            </Col>
            <Col sm>
              <span className="title d-block-down-md">
                { this.props.type }
              </span>
              
              <div className="location d-block-down-md">
                <Link
                  to={{
                    pathname: `/tx/${this.props.txid}`,
                    state: { transaction: this.props },
                  }}
                  onClick={() => this.props.changeRoute(`/tx/${this.props.txid}`)}
                >
                  { this.props.txid.slice(0, 36) }...
                </Link>
                <div className="d-block-down-md">
                  <Moment unix>
                    { this.props.blocktime }
                  </Moment>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <p className="desc">
                <Link
                  className="btn btn-add w-100-down-md"
                  to={{
                    pathname: `/address/${this.props.sendingaddress}`,
                  }}
                  onClick={() => this.props.changeRoute(`/address/${this.props.sendingaddress}`)}
                >
                  { this.props.sendingaddress }
                </Link>
                <ArrowIcon size={20} color="gray" className={arrowcname}/>
                <Link
                  className={addresscname}
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
        <Col sm="3" className="result-price text-center">
          <Row>
            <Col sm>
              <h4 className="title">
                <SanitizedFormattedNumber value={transactionAmount} />
              </h4>
            </Col>
          </Row>
          <Row className="transaction-asset">
            <Col sm>
              <small>{ this.props.propertyname } (#{ this.props.propertyid })</small>
            </Col>
          </Row>
          <Row className="h-56-md-up d-flex align-items-lg-center align-items-md-end">
            <Col sm className="btn-group mb-1">
              <Link
                className={statusColor}
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
