/**
 *
 * CrowdsaleTransaction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import ColoredHash from 'components/ColoredHash';
import StatusConfirmation from 'components/StatusConfirmation';
import WrapperLink from 'components/WrapperLink';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import WrapperTx from 'components/WrapperTx';
import WrapperTxDatetime from 'components/WrapperTxDatetime';
import 'components/Transaction/transaction.scss';
import getLocationPath, { getSufixURL } from 'utils/getLocationPath';

import AddressWrapper from 'components/AddressWrapper';
import StyledLink from 'components/StyledLink';
import GrayArrowForward from 'components/GrayArrowForward';
import GrayArrowDown from 'components/GrayArrowDown';
import CrowdsalePurchaseAmounts from 'components/CrowdsalePurchaseAmounts';
import CopyToClipboard from 'components/CopyToClipboard';

const WrapperTxLabel = styled.span`
  font-size: 1.25rem !important;
`;

class CrowdsaleTransaction extends React.PureComponent {
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

    const TransactionLabel = props =>
      props.type_int === 51 ? (
        <WrapperTxLabel>
          {props.crowdsale.propertyname} crowdsale started
        </WrapperTxLabel>
      ) : (
        <div>
          <CrowdsalePurchaseAmounts {...props} />
        </div>
      );

    const txAsset =
      this.props.type_int === 51
        ? {
          ...this.props.crowdsale,
          name: this.props.crowdsale.propertyname,
        }
        : {
          ...this.props.dessiredToken,
          name: this.props.dessiredToken.name,
        };

    return (
      <div className="transaction-result mx-auto text-center-down-md">
        <Row noGutters className="pb-0">
          <Col sm="12" md="1">
            <AssetLink asset={txAsset.propertyid}>
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
                    pathname: `${getSufixURL()}/tx/${this.props.txid}`,
                    state: { state: this.props.state },
                  }}
                >
                  <ColoredHash hash={this.props.txid} />
                </StyledLink>
              </WrapperTx>
              <CopyToClipboard
                tooltip="CrowdsaleTransaction Id Copied"
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
                to={{
                  pathname: `${getSufixURL()}/tx/${this.props.txid}`,
                  state: { state: this.props.state },
                }}
              >
                {status}
              </StyledLink>
            </div>
          </Col>
        </Row>
        <Row noGutters>
          <Col sm>
            <div className="desc">
              <AddressWrapper>
                <WrapperLink>
                  <StyledLink
                    className={` ${this.getHighlightIfOwner(
                      this.props.sendingaddress,
                    )}`}
                    to={{
                      pathname: `${getSufixURL()}/address/${
                        this.props.sendingaddress
                      }`,
                      state: { state: this.props.state },
                    }}
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
              {this.props.referenceaddress &&
              <div className="d-inline">
                <GrayArrowForward
                  className={`d-none ${arrowcnameright} ${arrowcname}`}
                />
                <GrayArrowDown className={`d-md-none ${arrowcname}`} />
                <AddressWrapper className={showreferencecname}>
                  <WrapperLink>
                    <StyledLink
                      className={addresscname}
                      to={{
                        pathname: `${getSufixURL()}/address/${
                          this.props.referenceaddress
                        }`,
                        state: { state: this.props.state },
                      }}
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
              }
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
