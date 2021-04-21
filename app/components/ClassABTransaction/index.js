import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row, Tooltip } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

import WrapperTx from 'components/WrapperTx';
import WrapperTxDatetime from 'components/WrapperTxDatetime';
import AddressWrapper from 'components/AddressWrapper';
import StyledLink from 'components/StyledLink';
import ColoredHash from 'components/ColoredHash';
import WrapperLink from 'components/WrapperLink';
import StyledIconCopy from 'components/StyledIconCopy';
import GrayArrowForward from 'components/GrayArrowForward';
import GrayArrowDown from 'components/GrayArrowDown';
import StatusConfirmation from 'components/StatusConfirmation';
import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { TXCLASSAB_ADDRESS_MAINNET } from 'containers/App/constants';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import getLocationPath, { getSufixURL } from 'utils/getLocationPath';

import CopyToClipboard from 'react-copy-to-clipboard';

/**
 *
 * ClassABTransaction
 *
 */

const ClassABTxsWrapperLink = styled(WrapperLink)`
  width: 90% !important;
`;
function ClassABTransaction(props) {
  const [tooltipTxOpen, setTooltipTxOpen] = useState(false);
  const [tooltipSenderOpen, setTooltipSenderOpen] = useState(false);
  const [tooltipRefererOpen, setTooltipRefererOpen] = useState(false);

  const toggleTxTooltip = () => {
    setTooltipTxOpen(true);
    setTimeout(() => setTooltipTxOpen(false), 1000);
  };

  const toggleSenderTooltip = () => {
    setTooltipSenderOpen(true);
    setTimeout(() => setTooltipSenderOpen(false), 1000);
  };

  const toggleRefererTooltip = () => {
    setTooltipRefererOpen(true);
    setTimeout(() => setTooltipRefererOpen(false), 1000);
  };

  let statusCSSClass =
    'wrapper-btn-block btn btn-primary btn-block font-weight-light w-50';

  const invalidClass = confirmations =>
    confirmations === 0
      ? `${statusCSSClass} tx-invalid btn-warning`
      : `${statusCSSClass} tx-invalid btn-danger`;

  statusCSSClass = props.valid
    ? `${statusCSSClass} btn-blue`
    : invalidClass(props.confirmations);

  const status = StatusConfirmation({
    ...props,
    confirmed: CONFIRMATIONS,
  });

  const getHighlightIfOwner = address =>
    isOwner(address) ? 'text-success' : '';

  const isOwner = address => TXCLASSAB_ADDRESS_MAINNET === address;

  const arrowcname = 'transaction-arrow-icon';
  const arrowcnameright = 'd-md-inline-flex';
  const addresscname = getHighlightIfOwner(props.referenceaddress);
  const showreferencecname = '';

  const transactionAmount = props.amount || '';

  const txcopyid = `txid_${props.txid.slice(0, 12)}`.replace(/ /g, '');
  const sendercopyid = `s-${txcopyid}`;
  const referercopyid = `r-${txcopyid}`;
  const invalidid = `invalid-${txcopyid}`;

  const getItemKey = (item, idx) => item.slice(0, 11).concat(idx);

  return (
    <div>
      <div className="transaction-result mx-auto text-center-down-md">
        <Row noGutters className="align-items-end pb-0">
          <Col sm="12" md="1">
            <h4>Hash</h4>
          </Col>
          <Col sm="12" md="5">
            <Row className="d-flex flex-xs-column flex-center-down-md mb-2">
              <div className="p-md-2 pt-xs-2 pl-xs-2">
                <span className="title d-block-down-md">
                  <SanitizedFormattedNumber
                    value={transactionAmount}
                    forceDecimals
                  />{' '}
                  BTC
                </span>
              </div>
            </Row>
            <Row className="d-flex flex-center-down-md mb-1 mt-1">
              <WrapperTx>
                <StyledLink
                  to={{
                    pathname: `https://www.blockchain.com/btc/tx/${props.txid}`,
                    state: { state: props.state },
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ColoredHash hash={props.txid} />
                </StyledLink>
              </WrapperTx>
              <CopyToClipboard text={props.txid} onCopy={toggleTxTooltip}>
                <StyledIconCopy
                  className="d-inline-flex d-md-none"
                  size={24}
                  id={txcopyid}
                />
              </CopyToClipboard>
              <Tooltip hideArrow isOpen={tooltipTxOpen} target={txcopyid}>
                Transaction Id Copied
              </Tooltip>
            </Row>
          </Col>
          <Col sm="12" md="5">
            <div className="d-flex flex-column text-center align-items-center">
              <WrapperTxDatetime>
                <FormattedUnixDateTime datetime={props.blocktime} />
              </WrapperTxDatetime>
            </div>
          </Col>
        </Row>
        <Row noGutters xs="1" sm="1" md="2">
          <Col>
            {/* <div className="desc"> */}
            {/* <div> */}
            <AddressWrapper>
              <ClassABTxsWrapperLink>
                <StyledLink
                  className={getHighlightIfOwner(props.sendingaddress)}
                  to={`${getSufixURL()}/address/${props.sendingaddress}`}
                >
                  {props.sendingaddress}
                </StyledLink>
              </ClassABTxsWrapperLink>
              <CopyToClipboard
                text={props.sendingaddress}
                onCopy={toggleSenderTooltip}
              >
                <StyledIconCopy
                  className="d-inline-flex"
                  size={24}
                  id={sendercopyid}
                />
              </CopyToClipboard>
              <Tooltip
                hideArrow
                isOpen={tooltipSenderOpen}
                target={sendercopyid}
              >
                Sender Address Copied
              </Tooltip>
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
          </Col>
          <Col>
            {props.referenceaddresses.map((reference, idx) => {
              const invalidAddr = isEmpty(reference.addr);
              const defaultClass = invalidAddr ? 'd-none' : '';
              const referenceAddr = invalidAddr
                ? 'Unable to decode'
                : reference.addr;
              return (
                <AddressWrapper
                  className={showreferencecname}
                  key={getItemKey(referenceAddr, idx)}
                >
                  <ClassABTxsWrapperLink>
                    <StyledLink
                      className={addresscname}
                      to={
                        invalidAddr
                          ? ''
                          : `${getSufixURL()}/address/${referenceAddr}`
                      }
                      disabled={invalidAddr}
                    >
                      {referenceAddr}
                    </StyledLink>
                  </ClassABTxsWrapperLink>
                  <CopyToClipboard
                    text={referenceAddr}
                    onCopy={toggleRefererTooltip}
                    className={defaultClass}
                  >
                    <StyledIconCopy
                      className="d-inline-flex"
                      size={24}
                      id={referercopyid}
                    />
                  </CopyToClipboard>
                  <Tooltip
                    hideArrow
                    isOpen={tooltipRefererOpen}
                    target={referercopyid}
                    className={defaultClass}
                  >
                    Reference Address Copied
                  </Tooltip>
                </AddressWrapper>
              );
            })}
            {/* </div> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}

ClassABTransaction.propTypes = {};

export default ClassABTransaction;
