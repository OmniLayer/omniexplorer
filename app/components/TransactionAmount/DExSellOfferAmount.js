import React from 'react';
import PropTypes from 'prop-types';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import GrayArrowForward from 'components/GrayArrowForward';

const DExSellOfferAmount = props => (
  <div className="dex-sell-offer-amount">
    <AssetLink asset={props.propertyid}>
      <AssetLogo
        className="asset-logo"
        asset={{
          ...props,
          name: props.propertyname,
          type_int: props.type_int,
        }}
        prop={props.propertyid}
        style={{
          width: '2rem',
          height: '2rem',
        }}
      />
    </AssetLink>
    <SanitizedFormattedNumber
      className="align-middle"
      value={props.amount}
    />{' '}
    <span className="text-muted align-middle">{props.propertyname}</span>

    <GrayArrowForward className="ml-3 mr-3" />
    <AssetLink asset={0}>
      <AssetLogo
        className="asset-logo"
        asset={{
          name: 'BTC',
          type_int: 1,
        }}
        prop={0}
        style={{
          width: '2rem',
          height: '2rem',
        }}
      />
    </AssetLink>
    <SanitizedFormattedNumber
      className="align-middle"
      value={props.bitcoindesired}
    />{' '}
    <span className="text-muted align-middle">BTC Desired</span>


  </div>
);

DExSellOfferAmount.propTypes = {
};

export default DExSellOfferAmount;
