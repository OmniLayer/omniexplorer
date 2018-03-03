/**
 *
 * TransactionDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, CardBody, CardHeader, CardText, Col, Collapse, Container, Row, Table } from 'reactstrap';
import styled from 'styled-components';
import Moment from 'react-moment';

import { CONFIRMATIONS } from 'containers/Transactions/constants';
import tokenLogo from 'images/token31.png';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTransactionDetail from './selectors';
import reducer from './reducer';

export class TransactionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.collapseOmniData = false;
    this.collapseDecoded = false;
    this.toggleRawData = () => (this.collapseOmniData = !this.collapseOmniData);
    this.toggleDecoded = () => (this.collapseDecoded = !this.collapseDecoded);
  }

  render() {
    const StyledContainer = styled(Container)`
      background-color: white;
    `;
    const StyledCard = styled(Card)`
      background-color: #2A72B5;
      border-color: #2A72B5;
    `;
    const StyledCardBody = styled(CardBody)`
      background-color: #348FE2;
      border-color: #348FE2;
    `;
    const DetailRow = styled(Row)`
      margin-top: 2rem;
      margin-bottom: 2rem;
    `;
    const SubtitleDetail = styled.small`
      display: block;
      font-size: 10px;
      font-weight: 400;
      margin-top: 5px;
    `;
    const A = styled.a`
      color: #41addd;

      &:hover {
        color: #6cc0e5;
      }
    ;`;

    const trxDetail = this.props.location.state.transaction;
    const status = (
      trxDetail.confirmations < CONFIRMATIONS
        ? `CONFIRMING (${trxDetail.confirmations} of ${CONFIRMATIONS})`
        : 'CONFIRMED'
    );

    return (
      <StyledContainer fluid>
        <Row>
          <Col>
            <StyledCard inverse>
              <CardHeader>Unconfirmed Transaction Warning</CardHeader>
              <StyledCardBody>
                <CardText>This transaction is unconfirmed. It is impossible to know the validity of an Omni transaction
                  before
                  it is confirmed in the blockchain. This is because the Omni Layer relies on the order of transactions
                  within
                  the blockchain to determine validity. Once the transaction is confirmed, balances will be updated
                  accordingly and you will be able to verify its validity.</CardText>
              </StyledCardBody>
            </StyledCard>
          </Col>
        </Row>
        <DetailRow>
          <Col className="col-auto mr-auto">
            <img src={tokenLogo} alt="Simple Send" className="img-thumbnail" />
          </Col>
          <Col>
            <Table className="table-profile">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <h4>Simple Send
                    <SubtitleDetail>
                      { trxDetail.txid }
                    </SubtitleDetail>
                    </h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight">
                  <td className="field">Amount</td>
                  <td><strong><span id="lamount">
                    { trxDetail.amount }
                  </span></strong></td>
                </tr>
                <tr>
                  <td className="field">Token</td>
                  <td><a href="/asset"><strong>TetherUS (#31)</strong></a></td>
                </tr>
                <tr>
                  <td className="field">Sender</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/wallet/${trxDetail.sendingaddress}`,
                      }}
                    >
                      { trxDetail.sendingaddress }
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="field">Recipient</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/wallet/${trxDetail.referenceaddress}`,
                      }}
                    >
                      { trxDetail.referenceaddress }
                    </Link>
                  </td>
                </tr>
                <tr className="highlight">
                  <td className="field" style={{ paddingTop: '12px' }}>Status</td>
                  <td>
                    <div className="text-left small">{ status }</div>
                    <div
                      className="progress"
                      style={{ height: '20px', width: '300px', marginBottom: '4px', marginTop: '4px' }}
                    >
                      <div className="progress-bar progress-bar-success" style={{ width: `${(trxDetail.confirmations / 6) * 100}%`, paddingTop: '1px' }}>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="field">Date/Time</td>
                  <td>
                    <span id="ldatetime">
                      <Moment unix>
                        { trxDetail.blocktime }
                      </Moment>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Block</td>
                  <td>
                    <span id="lblocknum">
                      { trxDetail.block }
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Bitcoin Fees</td>
                  <td><span id="lfees">{ trxDetail.fee } BTC</span></td>
                </tr>
                <tr>
                  <td className="field">Omni Fees</td>
                  <td><span id="lomnifees">0.00 OMNI</span></td>
                </tr>
                <tr className="d-none">
                  <td className="field">Payload</td>
                  <td><span id="lpayloadsize">16</span> bytes</td>
                </tr>
                <tr className="d-none">
                  <td className="field">Size</td>
                  <td><span id="ltxsize">N/A</span></td>
                </tr>
                <tr className="d-none">
                  <td className="field">Class</td>
                  <td><span id="lclass">C (nulldata)</span></td>
                </tr>
                <tr>
                  <td className="field">Type/Version</td>
                  <td><span id="ltypever">Type { trxDetail.type_int }, Version { trxDetail.version }</span></td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <A
                      href="#collapseRawData"
                      color="primary"
                      onClick={this.toggleRawData}
                      style={{ marginBottom: '1rem' }}
                    >Raw Omni Data</A>
                    <Collapse isOpen={this.collapseOmniData}>
                      <span id="lrawgettx">
                        <a
                          href="/rawtransaction"
                        >
                        Click here for raw transaction...
                      </a>
                      </span>
                    </Collapse>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <A
                      href="#collapseRawData"
                      color="primary"
                      onClick={this.toggleDecoded}
                      style={{ marginBottom: '1rem' }}
                    >Decoded Raw Payload</A>
                    <Collapse isOpen={this.collapseDecoded}>
                      <span id="lrawgettx">
                        <a
                          href="/rawpayload"
                        >
                        Click here for raw payload...
                      </a>
                      </span>
                    </Collapse>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </DetailRow>
        <Row>
        </Row>
      </StyledContainer>
    );
  }
}

TransactionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
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

export default compose(
  withReducer,
  withConnect,
)(TransactionDetail);
