import React from 'react';
import PropTypes from 'prop-types';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';

const SendAllAmount = props => (
  <div className="send-all-amount">
    {(props.subsends || []).map((send, idx) => (
      <div key={idx}>
        <span>
          <AssetLink asset={send.propertyid}>
            <AssetLogo
              asset={{
                ...send,
                name: send.propertyname,
              }}
              prop={send.propertyid}
              style={{
                width: '2rem',
                height: '2rem',
              }}
            />
          </AssetLink>
          <SanitizedFormattedNumber value={send.amount} />
          <span className="text-muted">
            {' '}
            {send.propertyname} (#{send.propertyid}){' '}
          </span>
        </span>
      </div>
    ))}
  </div>
);

SendAllAmount.propTypes = {
  purchases: PropTypes.any.isRequired,
};

export default SendAllAmount;
