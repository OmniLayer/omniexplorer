import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

import WrapperTx from 'components/WrapperTx';
import WrapperTxDatetime from 'components/WrapperTxDatetime';
import AddressWrapper from 'components/AddressWrapper';
import StyledLink from 'components/StyledLink';
import ColoredHash from 'components/ColoredHash';
import WrapperLink from 'components/WrapperLink';
import GrayArrowForward from 'components/GrayArrowForward';
import GrayArrowDown from 'components/GrayArrowDown';
import { TXCLASSAB_ADDRESS_MAINNET } from 'containers/App/constants';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
// @TODO: remove getLocationPath from others than sagas and Link component
import getLocationPath, { getSufixURL } from 'utils/getLocationPath';

import CopyToClipboard from 'components/CopyToClipboard';

/**
 *
 * ClassABTransaction
 *
 */

const ClassABTxsWrapperLink = styled(WrapperLink)`
  width: 90% !important;
`;
function ClassABTransaction(props) {
  const getHighlightIfOwner = address =>
    isOwner(address) ? 'text-success' : '';

  const isOwner = address => TXCLASSAB_ADDRESS_MAINNET === address;

  const arrowcname = 'transaction-arrow-icon';
  const arrowcnameright = 'd-md-inline-flex';
  const addresscname = getHighlightIfOwner(props.referenceaddress);
  const showreferencecname = '';
  const transactionAmount = props.amount || '';

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
              <CopyToClipboard
                tooltip="Transaction Id Copied"
                value={props.txid}
                hideArrow
              />
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
            <AddressWrapper>
              <ClassABTxsWrapperLink>
                @TODO: refactoring to CustomStyledLink with environment detection
                <StyledLink
                  className={getHighlightIfOwner(props.sendingaddress)}
                  to={`${getSufixURL()}/address/${props.sendingaddress}`}
                >
                  {props.sendingaddress}
                </StyledLink>
              </ClassABTxsWrapperLink>
              <CopyToClipboard
                tooltip="Sender Address Copied"
                value={props.sendingaddress}
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
                    @TODO: refactoring to StyledLink with environment detection
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
                    className={defaultClass}
                    tooltip="Reference Address Copied"
                    value={referenceAddr}
                    hideArrow
                  />
                </AddressWrapper>
              );
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
}

ClassABTransaction.propTypes = {};

export default ClassABTransaction;
