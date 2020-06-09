/**
 *
 * CrowdsalePurchaseAmounts
 *
 */

import React from 'react';
import styled from 'styled-components';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import GreenArrowForward from 'components/GreenArrowForward';
import GreenArrowDown from 'components/GreenArrowDown';
// import PropTypes from 'prop-types';
// const ForkIcon = require(`images/fork.svg`);
// import { ReactComponent as ForkIcon } from 'images/fork.svg';
import fork from 'images/fork.svg';

const WrapperTxLabel = styled.span`
  font-size: 1.25rem !important;
`;

const NewCrowdsaleTxDetail = (props) => (
  <WrapperTxLabel>
    <p>
      <span>Crowdsale Purchase</span>
      &nbsp;
      <SanitizedFormattedNumber
        value={props.amount}
        forceDecimals={props.divisible}
      />
      &nbsp;
    </p>
    <SanitizedFormattedNumber
      value={props.amount}
      forceDecimals={props.divisible}
    />
    {props.dessiredToken.propertyname}
    &nbsp;
    {/*<ForkIcon />*/}
    <img src={fork} alt="" width={24} />
    <GreenArrowForward className="d-none d-md-inline-flex" />
    <GreenArrowDown className="d-md-none mx-auto d-block" />
    &nbsp;
    <SanitizedFormattedNumber
      value={props.purchasedtokens}
      fractionDigits={8}
    />
    {props.crowdsale.propertyname}
    <br />
    (+
    <SanitizedFormattedNumber
      value={props.issuertokens}
      fractionDigits={8}
    />
    to Issuer)
  </WrapperTxLabel>
);
const OldCrowdsaleTxDetail = (props) => <WrapperTxLabel>
  <SanitizedFormattedNumber
    value={props.amount}
    forceDecimals={props.divisible}
  />
  {props.dessiredToken.propertyname}
  &nbsp;
  {/*<ForkIcon />*/}
  <img src={fork} alt="" width={24} />
  <GreenArrowForward className="d-none d-md-inline-flex" />
  <GreenArrowDown className="d-md-none mx-auto d-block" />
  &nbsp;
  <SanitizedFormattedNumber
    value={props.purchasedtokens}
    fractionDigits={8}
  />
  {props.crowdsale.propertyname}
  <br />
  (+
  <SanitizedFormattedNumber
    value={props.issuertokens}
    fractionDigits={8}
  />
  to Issuer)
</WrapperTxLabel>;

function CrowdsalePurchaseAmounts(props) {
  return (
    <div>
      <NewCrowdsaleTxDetail {...props} />
      <br />
      <br />
      <OldCrowdsaleTxDetail {...props} />
    </div>
  );
}

CrowdsalePurchaseAmounts.propTypes = {};

export default CrowdsalePurchaseAmounts;
