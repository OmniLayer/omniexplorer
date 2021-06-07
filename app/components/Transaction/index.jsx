/**
 *
 * Transaction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import { CONFIRMATIONS } from 'containers/Transactions/constants';
import CopyToClipboard from 'components/CopyToClipboard';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import ColoredHash from 'components/ColoredHash';
import AssetLink from 'components/AssetLink';
import AssetLogo from 'components/AssetLogo';
import WrapperLink from 'components/WrapperLink';
import getTransactionHeading from 'utils/getTransactionHeading';
import StatusConfirmation from 'components/StatusConfirmation';
import getLocationPath, {getSufixURL} from 'utils/getLocationPath';
import './transaction.scss';

import AddressWrapper from 'components/AddressWrapper';
import StyledLink from 'components/StyledLink';
import WrapperTx from 'components/WrapperTx';
import WrapperTxDatetime from 'components/WrapperTxDatetime';
import WarningTooltip from 'components/WarningTooltip';

import GrayArrowForward from 'components/GrayArrowForward';
import GrayArrowDown from 'components/GrayArrowDown';

class Transaction extends React.PureComponent {
  getHighlightIfOwner(address) {
    return this.isOwner(address) ? 'text-success' : '';
  }

  isOwner(address) {
    return this.props.addr ? this.props.addr === address : false;
  }

  render() {
    let statusCSSClass =
      'wrapper-btn-block btn btn-primary btn-block font-weight-light w-50';

    const invalidClass = confirmations =>
      confirmations === 0
        ? `${statusCSSClass} tx-invalid btn-warning`
        : `${statusCSSClass} tx-invalid btn-danger`;

    statusCSSClass = this.props.valid
      ? `${statusCSSClass} btn-blue`
      : invalidClass(this.props.confirmations);

    const status = StatusConfirmation({
      ...this.props,
      confirmed: CONFIRMATIONS,
    });

    let arrowcname;
    let arrowcnameright;
    let addresscname;
    let showreferencecname;

    if (this.props.referenceaddress) {
      arrowcname = 'transaction-arrow-icon';
      arrowcnameright = 'd-md-inline-flex';
      addresscname = this.getHighlightIfOwner(this.props.referenceaddress);
    } else {
      showreferencecname = 'd-none';
      arrowcname = 'd-none';
      addresscname = 'd-none';
    }

    const transactionAmount = this.props.amount || '';

    const txcopyid = `txid_${this.props.txid.slice(0, 12)}`.replace(/ /g, "");
    const invalidid = `invalid-${txcopyid}`;

    return (
      <div className="transaction-result mx-auto text-center-down-md">
        <Row noGutters className="align-items-end pb-0">
          <Col sm="12" md="1">
            <AssetLink asset={this.props.propertyid} >
              <AssetLogo
                asset={{
                  ...this.props,
                  name: this.props.propertyname,
                }}
                prop={this.props.propertyid}
                style={{
                  width: '4rem',
                  height: '4rem',
                  marginRight: '7px',
                }}
              />
            </AssetLink>
          </Col>
          <Col sm="12" md="5">
            <Row className="d-flex flex-xs-column flex-center-down-md mb-2">
              <div className="py-md-2 pt-xs-2 pr-xs-2">
                <span className="title d-block-down-md">
                  {getTransactionHeading(this.props)}
                </span>
              </div>
              <div className="p-md-2 pt-xs-2 pl-xs-2">
                <span className="title d-block-down-md">
                  <SanitizedFormattedNumber value={transactionAmount} />
                </span>
              </div>
              <div className="p-md-2 pb-sm-2">
                <span className="title text-muted">
                  {this.props.propertyname} (#{this.props.propertyid})
                </span>
              </div>
            </Row>
            <Row className="d-flex flex-center-down-md mb-1 mt-1">
              <WrapperTx>
                <StyledLink
                  to={{
                    pathname: `${getSufixURL()}/tx/${this.props.txid}`,
                    state: { state: this.props.state },
                  }}
                >
                  <ColoredHash hash={this.props.txid} />
                </StyledLink>
              </WrapperTx>
              <CopyToClipboard
                tooltip="Transaction Id Copied"
                value={this.props.txid}
                hideArrow
              />
            </Row>
          </Col>
          <Col sm="12" md="5">
            <div className="d-flex flex-column text-center align-items-center">
              <WrapperTxDatetime>
                <FormattedUnixDateTime datetime={this.props.blocktime} />
              </WrapperTxDatetime>
              <StyledLink
                className={statusCSSClass}
                style={{ cursor: 'default' }}
                to={{
                  pathname: `${getSufixURL()}/tx/${this.props.txid}`,
                  state: { state: this.props.state },
                }}
                id={invalidid}
              >
                {status}
              </StyledLink>
              {this.props.invalidreason &&
              <WarningTooltip
                placement="top"
                target={invalidid}
              >
                {this.props.invalidreason}
              </WarningTooltip>
              }
            </div>
          </Col>
        </Row>
        <Row noGutters>
          <Col sm>
            <div className="desc">
              <AddressWrapper>
                <WrapperLink>
                  <StyledLink
                    className={`${this.getHighlightIfOwner(this.props.sendingaddress)} w-75 d-inline-block`}
                    to={`${getSufixURL()}/address/${this.props.sendingaddress}`}
                  >
                    {this.props.sendingaddress}
                  </StyledLink>
                </WrapperLink>
                <CopyToClipboard
                  tooltip="Sender Address Copied"
                  value={this.props.sendingaddress}
                  hideArrow
                />
              </AddressWrapper>
              <GrayArrowForward
                size={20}
                color="gray"
                className={`d-none ${arrowcnameright} ${arrowcname}`}
              />
              <GrayArrowDown
                size={20}
                color="gray"
                className={`d-md-none ${arrowcname}`}
              />
              <AddressWrapper className={showreferencecname}>
                <WrapperLink>
                  <StyledLink
                    className={`${addresscname} w-75 d-inline-block`}
                    to={`${getSufixURL()}/address/${this.props.referenceaddress}`}
                  >
                    {this.props.referenceaddress}
                  </StyledLink>
                </WrapperLink>
                <CopyToClipboard
                  tooltip="Reference Address Copied"
                  value={this.props.referenceaddress}
                  hideArrow
                />
              </AddressWrapper>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Transaction.propTypes = {
  sendingaddress: PropTypes.string,
  referenceaddress: PropTypes.string,
  confirmations: PropTypes.number,
  type: PropTypes.string,
  txid: PropTypes.string,
  amount: PropTypes.any,
  valid: PropTypes.bool,
  blocktime: PropTypes.number,
  propertyname: PropTypes.string,
  propertyid: PropTypes.number,
  addr: PropTypes.string,
};

export default Transaction;
