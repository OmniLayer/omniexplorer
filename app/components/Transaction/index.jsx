/**
 *
 * Transaction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

import ArrowIcon from 'react-icons/lib/io/arrow-right-c';
import tokenLogo from 'images/token31.png';
import './transaction.scss';
import { CONFIRMATIONS } from 'containers/Transactions/constants';


const IMG = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 7px;
`;

class Transaction extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const status = (
      this.props.confirmations < CONFIRMATIONS
        ? `CONFIRMING (${this.props.confirmations} of ${CONFIRMATIONS})`
        : 'CONFIRMED'
    );

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
                  <a
                    href="#"
                  >
                    { this.props.txid.slice(0, 48) }...
                  </a>&nbsp;&nbsp;&nbsp;
                  { status }
                </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="desc" >
                <a href="#" className="btn btn-add m-r-5 m-b-5">
                  { this.props.sendingaddress }
                </a>
                <ArrowIcon size={20} color="gray" className="transaction-arrow-icon" />
                <a href="#" className="btn btn-add m-r-5 m-b-5">
                  { this.props.referenceaddress }
                </a>
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
              <small>TetherUS (#31)</small>
            </Col>
          </Row>
          <Row>
            <Col className="btn-group btn-group-sm">
              <a
                href="#"
                className="btn btn-primary btn-block btn-blue font-weight-light"
              >
                { status }
              </a>
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
};

export default Transaction;
