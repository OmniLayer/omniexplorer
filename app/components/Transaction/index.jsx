/**
 *
 * Transaction
 *
 */

import React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

import ArrowIcon from 'react-icons/lib/io/arrow-right-c';
import tokenLogo from 'images/token31.png';
import './transaction.scss';


const IMG = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 7px;
`;

class Transaction extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
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
                  Simple Send
                </span>
              </Row>
              <Row>
                <div className="location">
                  <a
                    href="lookuptx.aspx?txid=432a666c80c4b952b728f5920ac7ee529c97c64435f83b9db4b37377a35547d2"
                  >
                    432a666c80c4b952b728f5920ac7ee529c97c64435f83b9d...
                  </a>&nbsp;&nbsp;&nbsp;
                  UNCONFIRMED
                </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="desc" >
                <a href="lookupadd.aspx?address=1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA" className="btn btn-add m-r-5 m-b-5">
                  1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA
                </a>
                <ArrowIcon size={20} color="gray" className="transaction-arrow-icon" />
                <a href="lookupadd.aspx?address=17DNSgdJuLA6WxwN2Day5wSesGbQWjP4aX" className="btn btn-add m-r-5 m-b-5">
                  17DNSgdJuLA6WxwN2Day5wSesGbQWjP4aX
                </a>
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs="3" className="result-price text-center">
          <Row>
            <Col>
              <h4 className="title" >100</h4>
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
                href="lookuptx.aspx?txid=432a666c80c4b952b728f5920ac7ee529c97c64435f83b9db4b37377a35547d2"
                className="btn btn-primary btn-block btn-blue font-weight-light"
              >
                UNCONFIRMED
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Transaction.propTypes = {};

export default Transaction;
