/**
 *
 * CrowdsalePurchaseAmounts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import fork from 'images/fork.svg';

const WrapperTxLabel = styled.span`
  font-size: 1.25rem !important;
`;

const NewCrowdsaleTxDetail = props => (
  <WrapperTxLabel>
    <p>
      <span>
        Crowdsale Purchase &nbsp;
        <SanitizedFormattedNumber
          value={props.amount}
          forceDecimals={props.divisible}
        />
      </span>
      &nbsp;&nbsp;
      <span className="text-muted">
        {props.dessiredToken.name} (#{props.dessiredToken.propertyid})
      </span>
    </p>
    <div className="text-muted d-inline-block">
      {props.crowdsale.propertyname} (#{props.crowdsale.propertyid})
    </div>
    <br className="d-lg-none" />
    <div className="d-inline-block">
      <img src={fork} alt="" width={44} className="align-top" />
    </div>
    <div style={{ display: 'inline-grid' }}>
      <span className="text-left">
        Purchaser &nbsp;
        <SanitizedFormattedNumber
          value={props.purchasedtokens}
          fractionDigits={8}
        />
      </span>
      <span className="text-left">
        Issuer &nbsp;
        <SanitizedFormattedNumber
          value={props.issuertokens}
          fractionDigits={8}
        />
      </span>
    </div>
  </WrapperTxLabel>
);

function CrowdsalePurchaseAmounts(props) {
  return <NewCrowdsaleTxDetail {...props} />;
}

CrowdsalePurchaseAmounts.propTypes = {};

export default CrowdsalePurchaseAmounts;
