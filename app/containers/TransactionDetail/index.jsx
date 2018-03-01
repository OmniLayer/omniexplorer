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
import { Card, CardBody, CardHeader, CardText, Col, Collapse, Container, Row, Table, Progress } from 'reactstrap';
import styled from 'styled-components';

import tokenLogo from 'images/token31.png';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTransactionDetail from './selectors';
import reducer from './reducer';
import saga from './saga';

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
                      261fd6ab6b37ee6bfa1d7e18496c7e8e85a76073007869432b149c4006446387
                    </SubtitleDetail>
                    </h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight">
                  <td className="field">Amount</td>
                  <td><strong><span id="lamount">9848.5321999</span></strong></td>
                </tr>
                <tr className="divider">
                  <td colSpan={2}></td>
                </tr>
                <tr>
                  <td className="field">Token</td>
                  <td><a href="lookupsp.aspx?sp=31"><strong>TetherUS (#31)</strong></a></td>
                </tr>
                <tr>
                  <td className="field">Sender</td>
                  <td><a href="lookupadd.aspx?address=1KFFbhc3NpE1RChvKfuXy6rVSdK7ARdwTq">1KFFbhc3NpE1RChvKfuXy6rVSdK7ARdwTq</a>
                  </td>
                </tr>
                <tr>
                  <td className="field">Recipient</td>
                  <td><a href="lookupadd.aspx?address=1DcKsGnjpD38bfj6RMxz945YwohZUTVLby">1DcKsGnjpD38bfj6RMxz945YwohZUTVLby</a>
                  </td>
                </tr>

                <tr className="divider">
                  <td colSpan={2}></td>
                </tr>
                <tr className="highlight">
                  <td className="field" style={{ paddingTop: '12px' }}>Status</td>
                  <td>
                    <div
                      className="progress"
                      style={{ height: '20px', width: '300px', marginBottom: '4px', marginTop: '4px' }}
                    >
                      <div className="progress-bar progress-bar-success" style={{ width: '100%', paddingTop: '1px' }}>
                      CONFIRMED
                    </div>
                    </div>
                  </td>
                </tr>
                <tr className="divider">
                  <td colSpan={2}></td>
                </tr>
                <tr>
                  <td className="field">Date/Time</td>
                  <td><span id="ldatetime">15 hours and 40 minutes ago</span></td>
                </tr>
                <tr>
                  <td className="field">Block</td>
                  <td><span id="lblocknum">511429</span></td>
                </tr>
                <tr>
                  <td className="field">Bitcoin Fees</td>
                  <td><span id="lfees">0.0000136 BTC</span></td>
                </tr>
                <tr>
                  <td className="field">Omni Fees</td>
                  <td><span id="lomnifees">0.00 OMNI</span></td>
                </tr>
                <tr>
                  <td className="field">Payload</td>
                  <td><span id="lpayloadsize">16</span> bytes</td>
                </tr>
                <tr>
                  <td className="field">Size</td>
                  <td><span id="ltxsize">N/A</span></td>
                </tr>
                <tr>
                  <td className="field">Class</td>
                  <td><span id="lclass">C (nulldata)</span></td>
                </tr>
                <tr>
                  <td className="field">Type/Version</td>
                  <td><span id="ltypever">Type 0, Version 0</span></td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <A
                      href="#collapseRawData" color="primary" onClick={this.toggleRawData}
                      style={{ marginBottom: '1rem' }}
                    >Raw Omni Data</A>
                    <Collapse isOpen={this.collapseOmniData}>
                      <span id="lrawgettx">
                        <a
                          href="ask.aspx?api=gettx&amp;txid=261fd6ab6b37ee6bfa1d7e18496c7e8e85a76073007869432b149c4006446387"
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
                      href="#collapseRawData" color="primary" onClick={this.toggleDecoded}
                      style={{ marginBottom: '1rem' }}
                    >Decoded Raw Payload</A>
                    <Collapse isOpen={this.collapseDecoded}>
                      <span id="lrawgettx">
                        <a
                          href="ask.aspx?api=gettx&amp;txid=261fd6ab6b37ee6bfa1d7e18496c7e8e85a76073007869432b149c4006446387"
                        >
                        Click here for raw transaction...
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
