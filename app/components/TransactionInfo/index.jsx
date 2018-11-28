/**
 *
 * TransactionInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import styled from 'styled-components';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, Col, Collapse, Container, Row, Table } from 'reactstrap';

import TransactionAmount from 'components/TransactionAmount';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';
import getLogo from 'utils/getLogo';

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

function TransactionInfo(props) {
  let collapseOmniData = false;
  let collapseDecoded = false;
  const toggleRawData = () => (collapseOmniData = !collapseOmniData);
  const toggleDecoded = () => (collapseDecoded = !collapseDecoded);

  const isValid = props.valid;
  const statusColor = (isValid ? 'btn btn-group btn-primary btn-block btn-blue font-weight-light' : (props.confirmations === 0 ? 'btn btn-group btn-primary btn-block btn-warning font-weight-light' : 'btn btn-group btn-primary btn-block btn-danger font-weight-light'));

  const getStatus = (tx) => {
    if (tx.valid) {
      return (tx.confirmations < CONFIRMATIONS ?
          tx.confirmations === 0 ?
            'UNCONFIRMED' :
            tx.confirmations > 1 ?
              `${props.confirmations} CONFIRMATIONS` :
              `${props.confirmations} CONFIRMATION`
          :
          'CONFIRMED'
      );
    }
    return (tx.confirmations === 0 ? 'UNCONFIRMED' : 'INVALID');
  };
  const invalidReason = (props.confirmations === 0 ? '' : `Reason: ${props.invalidreason || ''}`);
  const rawTransactionURL = `${API_URL_BASE}/transaction/tx/${props.txid}`;
  const logo = getLogo(props.propertyid, props);

  let warningMessage = null;
  let dtheader;
  if (props.confirmations === 0) {
    warningMessage = (<Row>
      <Col sm>
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
    dtheader = 'Pending Since';
  } else {
    dtheader = 'Date/Time';
  }

  const amountDisplay = (<TransactionAmount {...props} />);
  let tokenName;
  if (![4, -22, 25, 26].includes(props.type_int)) {
    tokenName = (<tr>
      <td className="field">Property</td>
      <td>
        <Link
          to={{
            pathname: `/asset/${props.propertyid}`,
            state: { state: props },
          }}
          onClick={() => props.changeRoute(`/asset/${props.propertyid}`)}
        >
          <strong>{props.propertyname} &#40;#{props.propertyid}&#41;</strong>
        </Link>
      </td>
    </tr>);
  }
  if (props.type_int === 28) {
    tokenName = (<tr>
      <td className="field">Ecosystem</td>
      <td><strong>{props.ecosystem}</strong></td>
    </tr>);
  }

  let btcDesired;
  let specificAction;
  if (props.type_int === 20) {
    btcDesired = (<tr>
      <td className="field">Bitcoin Desired</td>
      <td>
        <strong>
          <span id="lamount">
            <SanitizedFormattedNumber value={props.bitcoindesired}/> BTC
          </span>
        </strong>
      </td>
    </tr>);
    specificAction = (`- ${props.action}`);
  }


  return (
    <StyledContainer fluid>
      {warningMessage}
      <DetailRow>
        <Col sm="2" className="col-auto mx-auto">
          <img
            src={logo}
            alt={props.type}
            className="img-thumbnail"
          />
        </Col>
        <Col sm>
          <Table responsive className="table-profile">
            <thead>
            <tr>
              <th></th>
              <th>
                <h4>{props.type} {specificAction}
                  <SubtitleDetail>
                    {props.txid}
                  </SubtitleDetail>
                </h4>
              </th>
            </tr>
            </thead>
            <tbody>
            {amountDisplay}
            {tokenName}
            {btcDesired}
            <tr>
              <td className="field">Sender</td>
              <td>
                <Link
                  to={{
                    pathname: `/address/${props.sendingaddress}`,
                    state: { state: props },
                  }}
                  onClick={() => props.changeRoute(`/address/${props.sendingaddress}`)}
                >
                  {props.sendingaddress}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="field">Recipient</td>
              <td>
                <Link
                  to={{
                    pathname: `/address/${props.referenceaddress}`,
                    state: { state: props },
                  }}
                  onClick={() => props.changeRoute(`/address/${props.referenceaddress}`)}
                >
                  {props.referenceaddress}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="field">{dtheader}</td>
              <td>
                  <span id="ldatetime">
                    <FormattedUnixDateTime datetime={props.blocktime}/>
                  </span>
              </td>
            </tr>
            <tr>
              <td className="field">In Block</td>
              <td>
                  <span id="lblocknum">
                    {props.block}
                  </span>
              </td>
            </tr>
            <tr>
              <td className="field" style={{ paddingTop: '12px' }}>Status</td>
              <td className="field">
                <div className={statusColor} style={{ width: '35%' }}>
                  {getStatus(props)}
                </div>
                <div className="text-left">{!isValid && invalidReason}</div>
              </td>
            </tr>
            <tr>
              <td className="field">Bitcoin Fees</td>
              <td><span id="lfees">{props.fee} BTC</span></td>
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
              >Type {props.type_int}, Version {props.version}</span>
              </td>
            </tr>
            <tr>
              <td className="field">Raw Data</td>
              <td>
                <span id="lrawgettx">
                  <a href={rawTransactionURL}>
                    Click here for raw transaction...
                  </a>
                </span>
              </td>
            </tr>
            <tr className="d-none">
              <td colSpan="2">
                <A
                  href="#collapseRawData"
                  color="primary"
                  onClick={toggleDecoded}
                  style={{ marginBottom: '1rem' }}
                >Decoded Raw Payload</A>
                <Collapse isOpen={collapseDecoded}>
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

TransactionInfo.propTypes = {
  sendingaddress: PropTypes.string,
  referenceaddress: PropTypes.string,
  confirmations: PropTypes.number,
  type: PropTypes.string,
  txid: PropTypes.string,
  amount: PropTypes.string,
  changeRoute: PropTypes.func,
  propertyname: PropTypes.string,
  propertyid: PropTypes.number,
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
)(TransactionInfo);
