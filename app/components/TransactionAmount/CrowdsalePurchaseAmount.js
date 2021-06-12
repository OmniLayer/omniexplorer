import React from 'react';
import PropTypes from 'prop-types';

import fork from 'images/fork.svg';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';

const CrowdsalePurchaseAmount = props => (
  <div className="d-inline-block crowdsale-purchase-amount">
    <div className="d-inline-block text-right">
      <AssetLink asset={props.propertyid}>
        <AssetLogo
          className="mr-0"
          asset={{
            ...props,
            name: props.propertyname,
          }}
          prop={props.propertyid}
          style={{
            width: '2rem',
            height: '2rem',
          }}
        />
      </AssetLink>
      <SanitizedFormattedNumber value={props.amount} fractionDigits={8} />
      <span className="text-muted d-inline-block">
        &nbsp;{props.propertyname} (#{props.propertyid}) Sent
      </span>
    </div>
    <br className="d-lg-none" />
    <div className="d-inline-block">
      <div className="d-inline-block">
        <img src={fork} alt="" width={44} className="align-top" />
      </div>
      <div style={{ display: 'inline-grid' }}>
        <div>
          <AssetLink asset={props.purchasedpropertyid}>
            <AssetLogo
              className="mr-0"
              asset={{
                ...props,
                name: props.purchasedpropertyname,
              }}
              prop={props.purchasedpropertyid}
              style={{
                width: '2rem',
                height: '2rem',
              }}
            />
          </AssetLink>
          {/* <span className="text-left">Purchaser &nbsp;</span> */}
          <div className="d-inline-block">
            <SanitizedFormattedNumber
              value={props.purchasedtokens}
              fractionDigits={8}
            />
            <span className="text-muted d-inline-block">
              &nbsp;{props.purchasedpropertyname} (#
              {props.purchasedpropertyid}) Purchased
            </span>
          </div>
        </div>
        <div>
          <AssetLink asset={props.purchasedpropertyid}>
            <AssetLogo
              className="mr-0"
              asset={{
                ...props,
                name: props.purchasedpropertyname,
              }}
              prop={props.purchasedpropertyid}
              style={{
                width: '2rem',
                height: '2rem',
              }}
            />
          </AssetLink>
          {/* <span className="text-left">Issuer &nbsp;</span> */}
          <div className="d-inline-block">
            <SanitizedFormattedNumber
              value={props.issuertokens}
              fractionDigits={8}
            />
            <span className="text-muted d-inline-block">
              &nbsp;{props.purchasedpropertyname} (#
              {props.purchasedpropertyid}) Additional generated for Issuer
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

CrowdsalePurchaseAmount.propTypes = {
  propertyid: PropTypes.any.isRequired,
  propertyname: PropTypes.any.isRequired,
  amount: PropTypes.any.isRequired,
  purchasedtokens: PropTypes.any.isRequired,
  issuertokens: PropTypes.any.isRequired,
  purchasedpropertyname: PropTypes.any.isRequired,
  purchasedpropertyid: PropTypes.any.isRequired,
};

export default CrowdsalePurchaseAmount;
