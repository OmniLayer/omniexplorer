import React from 'react';
import PropTypes from 'prop-types';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import GrayArrowForward from 'components/GrayArrowForward';
import { getShortName } from 'utils/getBlockchainName';

const DExPurchaseAmount = props => (
  <div className="dex-purchase-amount">
    {(props.purchases || []).map((purchase, idx) => (
      <div key={idx}>
        <AssetLink asset={0}>
          <AssetLogo
            className="asset-logo"
            asset={{
              ...props,
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
          value={purchase.amountpaid}
        />{' '}
        <span className="text-muted align-middle">{getShortName()} Paid</span>
        <GrayArrowForward className="ml-3 mr-3" />
        <AssetLink asset={purchase.propertyid}>
          <AssetLogo
            className="asset-logo"
            asset={{
              ...props,
              name: purchase.propertyname,
              type_int: purchase.propertyid,
            }}
            prop={purchase.propertyid}
            style={{
              width: '2rem',
              height: '2rem',
            }}
          />
        </AssetLink>
        <SanitizedFormattedNumber
          className="align-middle"
          value={purchase.amountbought}
        />{' '}
        <span className="text-muted align-middle">{purchase.propertyname}</span>
      </div>
    ))}
  </div>
);

DExPurchaseAmount.propTypes = {
  purchases: PropTypes.any.isRequired,
};

export default DExPurchaseAmount;
