import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row, Tooltip } from 'reactstrap';

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
import { EXODUS_ADDRESS_MAINNET } from 'containers/App/constants';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import getLocationPath, {getSufixURL} from 'utils/getLocationPath';

import CopyToClipboard from 'react-copy-to-clipboard';

/**
 *
 * ExodusTransaction
 *
 */
function ExodusTransaction(props) {
  const [tooltipTxOpen, setTooltipTxOpen] = useState(false);
  const [tooltipSenderOpen, setTooltipSenderOpen] = useState(false);
  const [tooltipRefererOpen, setTooltipRefererOpen] = useState(false);

const toggleTxTooltip = () => {
  setTooltipTxOpen( true);
  setTimeout(() => setTooltipTxOpen( false ), 1000);
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

  const getHighlightIfOwner = address => isOwner(address) ? 'text-success' : '';

  const isOwner = address => EXODUS_ADDRESS_MAINNET === address;

  let arrowcname;
  let arrowcnameright;
  let addresscname;
  let showreferencecname;

  if (props.referenceaddress) {
    arrowcname = 'transaction-arrow-icon';
    arrowcnameright = 'd-md-inline-flex';
    addresscname = getHighlightIfOwner(props.referenceaddress);
  } else {
    showreferencecname = 'd-none';
    arrowcname = 'd-none';
    addresscname = 'd-none';
  }

  const transactionAmount = props.amount || '';

  const txcopyid = `txid_${props.txid.slice(0, 12)}`;
  const sendercopyid = `s-${txcopyid}`;
  const referercopyid = `r-${txcopyid}`;
  const invalidid = `invalid-${txcopyid}`;
  debugger;
  return (
    <div>
      <div className="transation-result mx-auto text-center-down-md">
        <Row className="align-items-end pb-0">
          <Col>
            <h4>Hash</h4>
          </Col>
          <Col>
            <Row>
              <WrapperTx>
                <StyledLink
                  to={{
                    pathname: `/exodus-tx/${props.txid}`,
                    state: { state: props.state },
                  }}
                >
                  <ColoredHash hash={props.txid} />
                </StyledLink>
              </WrapperTx>
            </Row>
            <Row>
              <Col>{/*{props.txs[0].inputs[0].prev_out.addr}*/}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm />
        </Row>
      </div>

      <hr />
      <div className="transation-result mx-auto text-center-down-md">
        <Row className="align-items-end pb-0">
          <Col sm="12" md="1">
            {/* <AssetLink asset={props.propertyid} state={props.state}> */}
            {/*  <AssetLogo */}
            {/*    asset={{ */}
            {/*      ...props, */}
            {/*      name: props.propertyname, */}
            {/*    }} */}
            {/*    prop={props.propertyid} */}
            {/*    style={{ */}
            {/*      width: '4rem', */}
            {/*      height: '4rem', */}
            {/*      marginRight: '7px', */}
            {/*    }} */}
            {/*  /> */}
            {/* </AssetLink> */}
          </Col>
          <Col sm="12" md="5">
            <Row className="d-flex flex-xs-column flex-center-down-md mb-2">
              <div className="p-md-2 pt-xs-2 pr-xs-2">
                <span className="title d-block-down-md">
                  {/* getTransactionHeading(props) */}
                </span>
              </div>
              <div className="p-md-2 pt-xs-2 pl-xs-2">
                <span className="title d-block-down-md">
                  {/* amount */}
                   <SanitizedFormattedNumber value={transactionAmount} forceDecimals/> BTC
                  {/*<span>amount</span>*/}
                </span>
              </div>
              {/*<div className="p-md-2 pb-sm-2">*/}
              {/*  <span className="title text-muted">*/}
              {/*    /!* "{props.propertyname} (#{props.propertyid})" *!/*/}
              {/*    <span>prop name and id</span>*/}
              {/*  </span>*/}
              {/*</div>*/}
            </Row>
            <Row className="d-flex flex-center-down-md mb-1 mt-1">
              <WrapperTx>
                <StyledLink
                  to={{
                    pathname: `/exodus-tx/${props.txid}`,
                    state: { state: props.state },
                  }}
                >
                  <ColoredHash hash={props.txid} />
                </StyledLink>
              </WrapperTx>
               <CopyToClipboard
                text={props.txid}
                onCopy={toggleTxTooltip}
               >
                <StyledIconCopy
                  className="d-inline-flex d-md-none"
                  size={24}
                  id={txcopyid}
                />
               </CopyToClipboard>
               <Tooltip
                hideArrow
                isOpen={tooltipTxOpen}
                target={txcopyid}
               >
                Transaction Id Copied
               </Tooltip>
            </Row>
          </Col>
          <Col sm="12" md="5">
            <div className="d-flex flex-column text-center align-items-center">
              <WrapperTxDatetime>
                {/* <FormattedUnixDateTime datetime={props.blocktime} /> */}
                block time
              </WrapperTxDatetime>
              {/* <StyledLink */}
              {/*  className={statusCSSClass} */}
              {/*  style={{ cursor: 'default' }} */}
              {/*  to={{ */}
              {/*    pathname: `${getSufixURL()}/tx/${props.txid}`, */}
              {/*    state: { state: props.state }, */}
              {/*  }} */}
              {/*  id={invalidid} */}
              {/* > */}
              {/*  {status} */}
              {/* </StyledLink> */}
              <span>status</span>
              {/* {props.invalidreason && */}
              {/* <WarningTooltip */}
              {/*  placement="top" */}
              {/*  target={invalidid} */}
              {/* > */}
              {/*  {props.invalidreason} */}
              {/* </WarningTooltip> */}
              {/* } */}
              <span>invalid reason</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <div className="desc">
              <AddressWrapper>
                <WrapperLink>
                   <StyledLink
                    className={getHighlightIfOwner(props.sendingaddress)}
                    to={`${getSufixURL()}/address/${props.sendingaddress}`}
                   >
                    {props.sendingaddress}
                   </StyledLink>
                </WrapperLink>
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
              <AddressWrapper className={showreferencecname}>
                <WrapperLink>
                  {/* <StyledLink */}
                  {/*  className={addresscname} */}
                  {/*  to={`${getSufixURL()}/address/${props.referenceaddress}`} */}
                  {/* > */}
                  {/*  {props.referenceaddress} */}
                  {/* </StyledLink> */}
                  <span>reference address</span>
                </WrapperLink>
                {/* <CopyToClipboard */}
                {/*  text={props.referenceaddress} */}
                {/*  onCopy={this.toggleRefererTooltip} */}
                {/* > */}
                {/*  <StyledIconCopy */}
                {/*    className="d-inline-flex" */}
                {/*    size={24} */}
                {/*    id={referercopyid} */}
                {/*  /> */}
                {/* </CopyToClipboard> */}
                <span>copy to clipboard</span>
                {/* <Tooltip */}
                {/*  hideArrow */}
                {/*  isOpen={this.state.tooltipRefererOpen} */}
                {/*  target={referercopyid} */}
                {/* > */}
                {/*  Reference Address Copied */}
                {/* </Tooltip> */}
                <span>tooltip</span>
              </AddressWrapper>
            </div>
          </Col>
        </Row>
      </div>

      <hr />
      <ExodusTransaction2 />
    </div>
  );
}

function ExodusTransaction2() {
  return (
    <div>
      <div direction="vertical" className="sc-1fp9csv-0 clQqCp">
        <div className="sc-1xo2hia-0 ooDhA">
          <div width="50%" className="odi4cq-0 dMPYVC">
            <div width="100px" className="ccso3i-0 hKpYDy">
              <span
                className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx sc-1n72lkw-0 lhmHll"
                opacity="1"
              >
                Hash
              </span>
            </div>
            <div width="calc(100% - 100px)" className="ccso3i-0 bmbfXL">
              <a
                href="https://www.blockchain.com/btc/tx/734799979782b61da4b7cac145f3750ccde41f18770de591c7d3d2e85f76a25a"
                className="sc-1r996ns-0 gzrtQD sc-1tbyx6t-1 kXxRxe iklhnl-0 boNhIO"
                opacity="1"
              >
                734799979782b61da4b7cac145f3750ccde41f18770de591c7d3d2e85f76a25a
              </a>
            </div>
          </div>
          <div width="50%" className="odi4cq-0 dMPYVC">
            <div width="100px" className="ccso3i-0 hKpYDy">
              <div target="desktop" className="sc-197you3-0 bvHqAx">
                <span
                  className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx sc-1n72lkw-0 lhmHll"
                  opacity="1"
                >
                  Date
                </span>
              </div>
            </div>
            <div width="calc(100% - 100px)" className="ccso3i-0 bmbfXL">
              <div className="kad8ah-0 kKDjc">
                <span
                  className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                opacity="1">2020-07-28 09:03</span></div>
            </div>
          </div>
        </div>
        <div className="sc-1xo2hia-0 ooDhA">
          <div width="50%" className="odi4cq-0 dMPYVC">
            <div width="100px" className="ccso3i-0 hKpYDy">
              <div target="desktop" className="sc-197you3-0 bvHqAx">
                <span
                  className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx sc-1n72lkw-0 lhmHll"
                  opacity="1"
                >
                  From
                </span>
              </div>
            </div>
            <div width="calc(100% - 100px)" className="ccso3i-0 bmbfXL">
              <div className="pc1med-0 jXEkEE">
                <div className="pc1med-1 huGTnd">
                  <div className="ge5wha-0 gPBsWw">
                    <span
                      className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                      opacity="1"
                    >
                      1LgmqPpigz3Frj8zARocwujS7yvXko847h
                    </span>
                  <div className="ge5wha-1 hdwAPC">
                      <span
                        className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                    opacity="1">0.09519392 BTC</span><a
                        href="https://www.blockchain.com/btc/tx/9a0010217a3a2a96b1a8361f93d7f7ed95b551f55ac5fa8e67e7e8c6a4c36f74"
                    className="sc-1r996ns-0 gzrtQD sc-1tbyx6t-1 kXxRxe iklhnl-0 boNhIO" opacity="1">
                        <div>
                      <svg
viewBox="0 0 496 512" className="sc-1pmbxjh-0 bvrqDT sc-1legmm2-0 fiBrDw" height="14px"
                        selectable="1" width="14px">
                        <path
                          d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>
                          </svg>
                    </div>
                  </a></div>
                  </div>
                </div>
                <div className="pc1med-2 iFMuja" />
              </div>
            </div>
          </div>
          <div width="50%" className="odi4cq-0 dMPYVC">
            <div width="100px" className="ccso3i-0 hKpYDy">
              <div target="desktop" className="sc-197you3-0 bvHqAx">
                <span
                  className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx sc-1n72lkw-0 lhmHll"
                  opacity="1"
                >
                  To
                </span>
              </div>
              <div target="mobile" className="sc-197you3-0 ljbrSF">
                <svg
enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32"
                  width="32px" className="sc-1ub63u6-0 uRdJX">
                  <g id="background">
                    <rect fill="none" height="32" width="32" />
                  </g>
                  <g id="arrow_x5F_full_x5F_right">
                    <polygon points="16,2.001 16,10 2,10 2,22 16,22 16,30 30,16  " />
                  </g>
                </svg>
              </div>
            </div>
            <div width="calc(100% - 100px)" className="ccso3i-0 bmbfXL">
              <div className="azsi2v-0 iOfeMf">
                <div className="azsi2v-1 gkQXry">
                  <div className="sc-19pxzmk-0 lhmncg">
                    <span
                      className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                      opacity="1"
                    >
                      OP_RETURN
                    </span>
                    <span
                      className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                      opacity="1"
                    >
                      0.00000000 BTC
                    </span>
                  </div>
                  <div className="sc-19pxzmk-0 lhmncg">
                    <a
                      href="https://www.blockchain.com/btc/address/15HgHk3vX8SF1EedQLPEXRNAhywyk64qA3"
                      className="sc-1r996ns-0 gzrtQD sc-1tbyx6t-1 kXxRxe iklhnl-0 boNhIO"
                      opacity="1"
                    >
                      15HgHk3vX8SF1EedQLPEXRNAhywyk64qA3
                    </a>
                  <div className="sc-19pxzmk-1 cspEAW">
                      <span
                        className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                    opacity="1">0.00000546 BTC</span>
                  <div>
                    <svg
viewBox="0 0 496 512" className="sc-1pmbxjh-0 cComos sc-1eth4zq-1 bCvdMP" height="14px"
                      selectable="0" width="14px">
                      <path
                        d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>
                    </svg>
                  </div>
                  </div>
                  </div>
                  <div className="sc-19pxzmk-0 lhmncg">
                    <span
                      className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                      opacity="1"
                    >
                      1LgmqPpigz3Frj8zARocwujS7yvXko847h
                    </span>
                  <div className="sc-19pxzmk-1 cspEAW">
                      <span
                        className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                    opacity="1">0.09489438 BTC</span><a
                        href="https://www.blockchain.com/btc/tx/5d1e03779b3f33888023331d81696291fee5d8cff4abf615918461a60191386c"
                    className="sc-1r996ns-0 gzrtQD sc-1tbyx6t-1 kXxRxe iklhnl-0 boNhIO" opacity="1">
                        <div>
                      <svg
viewBox="0 0 496 512" className="sc-1pmbxjh-0 bvrqDT sc-1eth4zq-0 bmWQqq" height="14px"
                        selectable="1" width="14px">
                        <path
                          d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>
                          </svg>
                    </div>
                  </a></div>
                  </div>
                </div>
                <div className="azsi2v-2 gGLePR" />
              </div>
            </div>
          </div>
        </div>
        <div className="sc-1xo2hia-0 ooDhA">
          <div width="50%" className="odi4cq-0 dMPYVC">
            <div width="100px" className="ccso3i-0 hKpYDy">
              <span
                className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx sc-1n72lkw-0 lhmHll"
                opacity="1"
              >
                Fee
              </span>
            </div>
            <div width="calc(100% - 100px)" className="ccso3i-0 bmbfXL">
              <div className="kad8ah-1 giMhWw">
                <span
                  className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                opacity="1">0.00029408 BTC</span><span
                  className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg"
                  opacity="1"
                >
                  (114.875 sat/B - 28.719 sat/WU - 256 bytes)
                </span>
              </div>
            </div>
          </div>
          <div width="50%" className="odi4cq-0 dMPYVC">
            <div width="100px" className="ccso3i-0 fWCAed">
              <div target="desktop" className="sc-197you3-0 bvHqAx">
                <span
                  className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx sc-1n72lkw-0 lhmHll"
                  opacity="1"
                >
                  Amount
                </span>
              </div>
            </div>
            <div width="calc(100% - 100px)" className="ccso3i-0 gmtFME">
              <div className="kad8ah-2 htQidj">
                <div className="kad8ah-0 gsjnEH">
                  <span
                    className="sc-1ryi78w-0 gCzMgE sc-16b9dsl-1 kUAhZx u3ufsr-0 fGQJzg sc-85fclk-0 kcLHOb"
                    opacity="1"
                  >
                    -0.00029954 BTC
                  </span>
                </div>
                <div>
                  <span className="sc-1rs1xpb-0 gcloxF sc-1mclc94-0 s24bmm-0 yZDdO">
                    2 Confirmations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ExodusTransaction.propTypes = {};

export default ExodusTransaction;
