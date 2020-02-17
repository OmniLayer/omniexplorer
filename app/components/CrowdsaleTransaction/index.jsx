/**
 *
 * CrowdsaleTransaction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Col, Row, Tooltip } from 'reactstrap';
import styled from 'styled-components';

import CopyToClipboard from 'react-copy-to-clipboard';

import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import ColoredHash from 'components/ColoredHash';
import StatusConfirmation from 'components/StatusConfirmation';
import WrapperLink from 'components/WrapperLink';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import WrapperTx from 'components/WrapperTx';
import WrapperTxDatetime from 'components/WrapperTxDatetime';
import 'components/Transaction/transaction.scss';

import AddressWrapper from 'components/AddressWrapper';
import StyledLink from 'components/StyledLink';
import StyledIconCopy from 'components/StyledIconCopy';
import GreenArrowForward from 'components/GreenArrowForward';
import GreenArrowDown from 'components/GreenArrowDown';
import GrayArrowForward from 'components/GrayArrowForward';
import GrayArrowDown from 'components/GrayArrowDown';

const WrapperTxLabel = styled.span`
  font-size: 1.25rem !important;
`;

class CrowdsaleTransaction extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    
    this.state = {
      tooltipTxOpen: false,
      tooltipSenderOpen: false,
      tooltipRefererOpen: false,
    };
  }
  
  toggleTxTooltip = () => {
    this.setState({ tooltipTxOpen: true });
    setTimeout(() => this.setState({ tooltipTxOpen: false }), 1000);
  };
  
  toggleSenderTooltip = () => {
    this.setState({ tooltipSenderOpen: true });
    setTimeout(() => this.setState({ tooltipSenderOpen: false }), 1000);
  };
  
  toggleRefererTooltip = () => {
    this.setState({ tooltipRefererOpen: true });
    setTimeout(() => this.setState({ tooltipRefererOpen: false }), 1000);
  };
  
  getHighlightIfOwner(address) {
    return this.isOwner(address) ? 'text-success' : '';
  }
  
  isOwner(address) {
    return this.props.addr ? this.props.addr === address : false;
  }
  
  render() {
    let statusCSSClass = 'btn btn-primary btn-block font-weight-light w-50';
    statusCSSClass = this.props.valid
      ? `${statusCSSClass} btn-blue`
      : this.props.confirmations === 0
        ? `${statusCSSClass} btn-warning`
        : `${statusCSSClass} btn-danger`;
    
    const status = StatusConfirmation({
      valid: this.props.valid,
      confirmations: this.props.confirmations,
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
    
    const txcopyid = `txid_${this.props.txid.slice(0, 12)}`;
    const sendercopyid = `s-${txcopyid}`;
    const referercopyid = `r-${txcopyid}`;
    
    const TransactionLabel = props =>
      props.type_int === 51 ? (
        <WrapperTxLabel>
          {props.crowdsale.propertyname} crowdsale started
        </WrapperTxLabel>
      ) : (
        <WrapperTxLabel>
          <SanitizedFormattedNumber
            value={props.amount}
            forceDecimals={props.divisible}
          />{' '}
          {props.dessiredToken.propertyname}
          &nbsp;
          <GreenArrowForward className="d-none d-md-inline-flex" />
          <GreenArrowDown className="d-md-none mx-auto d-block" />
          &nbsp;
          <SanitizedFormattedNumber
            value={props.purchasedtokens}
            fractionDigits={8}
          />{' '}
          {props.crowdsale.propertyname}
          <br />
          (+
          <SanitizedFormattedNumber
            value={props.issuertokens}
            fractionDigits={8}
          />{' '}
          to Issuer)
        </WrapperTxLabel>
      );
    
    const txAsset =
      this.props.type_int === 51
        ? {
          ...this.props.crowdsale,
          name: this.props.crowdsale.propertyname,
        }
        : {
          ...this.props.dessiredToken,
          name: this.props.dessiredToken.propertyname,
        };
    
    return (
      <div className="transation-result mx-auto text-center-down-md">
        <Row className="align-items-end pb-0">
          <Col sm="12" md="1">
            <AssetLink asset={txAsset.propertyid} state={this.props.state}>
              <AssetLogo
                asset={txAsset}
                prop={txAsset.propertyid}
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
              <TransactionLabel {...this.props} />
            </Row>
            <Row className="d-flex flex-center-down-md mb-sm-1 mt-sm-1">
              <WrapperTx>
                <StyledLink
                  to={{
                    pathname: `/tx/${this.props.txid}`,
                    state: { state: this.props.state },
                  }}
                >
                  <ColoredHash hash={this.props.txid} />
                </StyledLink>
              </WrapperTx>
              <CopyToClipboard
                text={this.props.txid}
                onCopy={this.toggleTxTooltip}
              >
                <StyledIconCopy
                  className="d-inline-flex d-md-none"
                  size={24}
                  id={txcopyid}
                />
              </CopyToClipboard>
              <Tooltip
                hideArrow
                isOpen={this.state.tooltipTxOpen}
                target={txcopyid}
              >
                CrowdsaleTransaction Id Copied
              </Tooltip>
            </Row>
          </Col>
          <Col sm="12" md="5">
            <div className="d-flex flex-column text-center align-items-center">
              <WrapperTxDatetime>
                <FormattedUnixDateTime datetime={this.props.blocktime} />
              </WrapperTxDatetime>
              <StyledLink
                className={statusCSSClass}
                to={{
                  pathname: `/tx/${this.props.txid}`,
                  state: { state: this.props.state },
                }}
              >
                {status}
              </StyledLink>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <div className="desc">
              <AddressWrapper>
                <WrapperLink>
                  <StyledLink
                    className={` ${this.getHighlightIfOwner(
                      this.props.sendingaddress,
                    )}`}
                    to={{
                      pathname: `/address/${this.props.sendingaddress}`,
                      state: { state: this.props.state },
                    }}
                  >
                    {this.props.sendingaddress}
                  </StyledLink>
                </WrapperLink>
                <CopyToClipboard
                  text={this.props.sendingaddress}
                  onCopy={this.toggleSenderTooltip}
                >
                  <StyledIconCopy
                    className="d-inline-flex"
                    size={24}
                    id={sendercopyid}
                  />
                </CopyToClipboard>
                <Tooltip
                  hideArrow
                  isOpen={this.state.tooltipSenderOpen}
                  target={sendercopyid}
                >
                  Sender Address Copied
                </Tooltip>
              </AddressWrapper>
              <GrayArrowForward
                className={`d-none ${arrowcnameright} ${arrowcname}`}
              />
              <GrayArrowDown className={`d-md-none ${arrowcname}`} />
              <AddressWrapper className={showreferencecname}>
                <WrapperLink>
                  <StyledLink
                    className={addresscname}
                    to={{
                      pathname: `/address/${this.props.referenceaddress}`,
                      state: { state: this.props.state },
                    }}
                  >
                    {this.props.referenceaddress}
                  </StyledLink>
                </WrapperLink>
                <CopyToClipboard
                  text={this.props.referenceaddress}
                  onCopy={this.toggleRefererTooltip}
                >
                  <StyledIconCopy
                    className="d-inline-flex"
                    size={24}
                    id={referercopyid}
                  />
                </CopyToClipboard>
                <Tooltip
                  hideArrow
                  isOpen={this.state.tooltipRefererOpen}
                  target={referercopyid}
                >
                  Reference Address Copied
                </Tooltip>
              </AddressWrapper>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

CrowdsaleTransaction.propTypes = {
  sendingaddress: PropTypes.string,
  referenceaddress: PropTypes.string,
  confirmations: PropTypes.number,
  type: PropTypes.string,
  txid: PropTypes.string,
  amount: PropTypes.string,
  valid: PropTypes.bool,
  blocktime: PropTypes.number,
  propertyname: PropTypes.string,
  propertyid: PropTypes.number,
  addr: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(CrowdsaleTransaction);
