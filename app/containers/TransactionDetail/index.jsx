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
import { Card, CardBody, CardHeader, CardText, Col, Collapse, Container, Progress, Row, Table } from 'reactstrap';
import styled from 'styled-components';
import Moment from 'react-moment';

import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import LoadingIndicator from 'components/LoadingIndicator';
import TransactionAmount from 'components/TransactionAmount';

import makeSelectTransactionDetail from './selectors';
import sagaTxDetail from './saga';
import { loadTransaction } from './actions';
import reducer from './reducer';

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

export class TransactionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.collapseOmniData = false;
    this.collapseDecoded = false;
    this.toggleRawData = () => (this.collapseOmniData = !this.collapseOmniData);
    this.toggleDecoded = () => (this.collapseDecoded = !this.collapseDecoded);

    this.txid = this.props.match.params.tx.toString();
  }

  componentDidMount() {
    this.props.loadTransaction(this.txid);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.tx !== this.txid) {
      this.props.loadTransaction(this.txid);
    }
  }

  render() {
    if (this.props.txdetail.loading) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }

    if (this.props.txdetail.transaction.notFound) {
      return (
        <Container>
          <h1> Transaction
            <small> { this.txid.slice(0, 24) }... </small>
            not found
          </h1>
        </Container>
      );
    }

    const isValid = this.props.txdetail.transaction.valid;
    const progressColor = (isValid ? 'info' : 'danger');
    const progressPercent = Math.floor(((this.props.txdetail.transaction.confirmations / CONFIRMATIONS) * 100));
    const getStatus = (tx) => {
      if (tx.valid) {
        return (tx.confirmations < CONFIRMATIONS ?
            `CONFIRMING (${this.props.txdetail.transaction.confirmations} of ${CONFIRMATIONS})` :
            'CONFIRMED'
        );
      }
      return 'INVALID';
    };
    const invalidReason = `Reason: ${this.props.txdetail.transaction.invalidreason || ''}`;
    const rawTransactionURL = `${API_URL_BASE}/transaction/tx/${this.txid}`;

    let logo;
    try {
      logo = require(`images/token${this.props.txdetail.transaction.propertyid}.png`);
    } catch (e) {
      if (this.props.txdetail.transaction.type_int === 4) {
        logo = require('images/sendall.png');
      } else {
        logo = require('images/tokendefault.png');
      }
    }

    let warningMessage = null;
    if (this.props.txdetail.transaction.confirmations === 0) {
      warningMessage = (<Row>
        <Col>
          <StyledCard inverse>
            <CardHeader>Unconfirmed Transaction Warning</CardHeader>
            <StyledCardBody>
              <CardText>This transaction is unconfirmed. It is impossible to know the validity of an Omni
                transaction
                before
                it is confirmed in the blockchain. This is because the Omni Layer relies on the order of
                transactions
                within
                the blockchain to determine validity. Once the transaction is confirmed, balances will be updated
                accordingly and you will be able to verify its validity.</CardText>
            </StyledCardBody>
          </StyledCard>
        </Col>
      </Row>);
    }

    const amountDisplay = (<TransactionAmount {...this.props.txdetail.transaction} />);
    let tokenName;
    if (![4,-22,25,26].includes(this.props.txdetail.transaction.type_int)) {
      tokenName = (<tr>
        <td className="field">Token</td>
        <td><a href="/asset"><strong>{ this.props.txdetail.transaction.propertyname } &#40;#{ this.props.txdetail.transaction.propertyid }&#41;</strong></a></td>
      </tr>);
    }
    if ( this.props.txdetail.transaction.type_int === 28 ) {
      tokenName = (<tr>
        <td className="field">Ecosystem</td>
        <td><strong>{ this.props.txdetail.transaction.ecosystem }</strong></td>
      </tr>);
    }

    return (
      <StyledContainer fluid>
        { warningMessage }
        <DetailRow>
          <Col className="col-auto mr-auto col-sm-2">
            <img
              src={logo}
              alt={this.props.txdetail.transaction.type}
              className="img-thumbnail"
            />
          </Col>
          <Col>
            <Table className="table-profile">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <h4>{ this.props.txdetail.transaction.type }
                      <SubtitleDetail>
                        { this.props.txdetail.transaction.txid }
                      </SubtitleDetail>
                    </h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                { amountDisplay }
                { tokenName }
                <tr>
                  <td className="field">Sender</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/address/${this.props.txdetail.transaction.sendingaddress}`,
                      }}
                    >
                      { this.props.txdetail.transaction.sendingaddress }
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="field">Recipient</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/address/${this.props.txdetail.transaction.referenceaddress}`,
                      }}
                    >
                      { this.props.txdetail.transaction.referenceaddress }
                    </Link>
                  </td>
                </tr>
                <tr className="highlight">
                  <td className="field" style={{ paddingTop: '12px' }}>Status</td>
                  <td>
                    <div className="text-left">{ getStatus(this.props.txdetail.transaction) }</div>
                    <Progress color={progressColor} value={progressPercent} />
                    <div className="text-left">{ !isValid && invalidReason }</div>
                  </td>
                </tr>
                <tr>
                  <td className="field">Date/Time</td>
                  <td>
                    <span id="ldatetime">
                      <Moment unix>
                        { this.props.txdetail.transaction.blocktime }
                      </Moment>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Block</td>
                  <td>
                    <span id="lblocknum">
                      { this.props.txdetail.transaction.block }
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Bitcoin Fees</td>
                  <td><span id="lfees">{ this.props.txdetail.transaction.fee } BTC</span></td>
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
                  <td><span
                    id="ltypever"
                  >Type { this.props.txdetail.transaction.type_int }, Version { this.props.txdetail.transaction.version }</span>
                  </td>
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
                          href={rawTransactionURL}
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
                        (Coming Soon) Click here for raw payload...
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
  loadTransaction: PropTypes.func,
  txdetail: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    loadTransaction: (addr) => dispatch(loadTransaction(addr)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  txdetail: makeSelectTransactionDetail(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'transactionDetail', reducer });
const withSaga = injectSaga({ key: 'transactionDetail', saga: sagaTxDetail });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionDetail);
