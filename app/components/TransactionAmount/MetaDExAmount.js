import React from 'react';
import PropTypes from 'prop-types';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';

const MetaDExAmount = props => (
  <div className="meta-dex-amount">
    <div>
    <AssetLink asset={props.propertyidforsale}>
      <AssetLogo
        asset={props.propertyforsale}
        prop={props.propertyidforsale}
        style={{
          width: '2rem',
          height: '2rem',
        }}
      />
    </AssetLink>
    <SanitizedFormattedNumber
      className="align-middle"
      value={props.amountforsale}
    />{' '}
    <span className="align-middle text-muted">
      {props.propertyforsale.name} (#
      {props.propertyidforsale}) For Sale
    </span>
    </div>
    <div className="mt-2">
    <AssetLink className="mt-2" asset={props.propertyiddesired}>
      <AssetLogo
        asset={props.propertydesired}
        prop={props.propertyiddesired}
        style={{
          width: '2rem',
          height: '2rem',
        }}
      />
    </AssetLink>
    <SanitizedFormattedNumber
      className="align-middle"
      value={props.amountdesired}
    />{' '}
    <span className="align-middle text-muted">
      {props.propertydesired.name} (#
      {props.propertyiddesired}) Desired
    </span>
    </div>
  </div>
);

MetaDExAmount.propTypes = {
  purchases: PropTypes.any.isRequired,
};

export default MetaDExAmount;
