/**
 *
 * CrowdsalePurchaseAmounts
 *
 */

import React from 'react';
import styled from 'styled-components';

import CrowdsalePurchaseAmount from 'components/TransactionAmount/CrowdsalePurchaseAmount';

const WrapperTxLabel = styled.span`
  font-size: 1.25rem !important;
`;

const CrowdsalePurchaseAmounts = props => (
  <WrapperTxLabel>
    <p>
      <span>Crowdsale Purchase</span>
    </p>
    <CrowdsalePurchaseAmount
      amount={props.amount}
      propertyid={props.dessiredToken.propertyid}
      propertyname={props.dessiredToken.name}
      purchasedpropertyid={props.crowdsale.propertyid}
      purchasedpropertyname={props.crowdsale.propertyname}
      purchasedtokens={props.purchasedtokens}
      issuertokens={props.issuertokens}
    />
  </WrapperTxLabel>
);

CrowdsalePurchaseAmounts.propTypes = {};

export default CrowdsalePurchaseAmounts;
