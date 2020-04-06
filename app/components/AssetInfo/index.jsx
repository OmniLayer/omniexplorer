/**
 *
 * AssetInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment/src/moment';
import StyledA from 'components/StyledA';
import StyledLink from 'components/StyledLink';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import { API_URL_BASE, FEATURE_ACTIVATION_TYPE_INT } from 'containers/App/constants';
import normalizeURL from 'utils/normalizeURL';

const StyledTD = styled.td.attrs({
  className: 'field',
})`
  width: 8rem;
`;

function AssetInfo(asset) {
  const rawAssetURL = `${API_URL_BASE}/property/${asset.propertyid}`;

  let tokenName;
  let propertyID;
  if (![4, -22, 25, 26].includes(asset.type_int)) {
    tokenName = (
      <tr>
        <StyledTD>Name</StyledTD>
        <td>
          <strong>{asset.name || asset.propertyname || asset.type}</strong>
        </td>
      </tr>
    );
    propertyID = (
      <tr>
        <StyledTD>PropertyID</StyledTD>
        <td>
          <strong>#{asset.propertyid}</strong>
        </td>
      </tr>
    );
  }

  if (asset.type_int === 28) {
    tokenName = (
      <tr>
        <StyledTD>Ecosystem</StyledTD>
        <td>
          <strong>{asset.ecosystem}</strong>
        </td>
      </tr>
    );
  }

  if(asset.type_int === FEATURE_ACTIVATION_TYPE_INT){
    propertyID= (
      <tr>
        <StyledTD>Feature Activation</StyledTD>
        <td>
          <strong>#{asset.name}</strong>
        </td>
      </tr>
    );
  }
  let asseturl;
  const Strike = styled.span`
    text-decoration: line-through;
  `;
  if (asset.flags.duplicate || asset.flags.scam) {
    asseturl = (
      <td>
        <Strike>{asset.url}</Strike> See Warning - Be Careful
      </td>
    );
  } else if (asset.url.includes('.')) {
    asseturl = (
      <td>
        <StyledA href={normalizeURL(asset.url)} target="_blank" rel="noopener noreferrer">
          {asset.url}
        </StyledA>
      </td>
    );
  } else {
    asseturl = <td>{asset.url}</td>;
  }

  let registeredMessage;
  if (asset.flags.registered) {
    registeredMessage = (
      <td dangerouslySetInnerHTML={{ __html: asset.rdata }} />
    );
  } else {
    registeredMessage = (
      <td>
        This property is not registered with OmniExplorer.info. Please see{' '}
        <StyledA href="/promote">Promote Your Property</StyledA> for further details.
      </td>
    );
  }

  let assetData;
  if (asset.data) {
    assetData = (
      <tr>
        <StyledTD>Data</StyledTD>
        <td>
          <span>{asset.data}</span>
        </td>
      </tr>
    );
  }
  const crowdsaleClosed = (asset.deadline * 1000) <= moment.utc().valueOf();
  const closingLabel = crowdsaleClosed ? 'Closed' : 'Closing';
  return (
    <tbody>
      <tr>
        <StyledTD>Total</StyledTD>
        <td>
          <strong>
            <SanitizedFormattedNumber value={asset.totaltokens} /> Tokens
          </strong>
        </td>
      </tr>
      {tokenName}
      {propertyID}
      <tr>
        <StyledTD>Created</StyledTD>
        <td>
          <span id="ldatetime">
            <FormattedUnixDateTime datetime={asset.blocktime} useSeconds={false} />
          </span>
        </td>
      </tr>
      {asset.type_int===51 &&
        <tr>
          <StyledTD>{closingLabel}</StyledTD>
          <td>
            <span id="ldatetime">
              <FormattedUnixDateTime datetime={asset.deadline} useSeconds={false} />
            </span>
          </td>
        </tr>
      }
      {assetData}
      <tr>
        <StyledTD>Issuer</StyledTD>
        <td>
          <StyledLink
            to={{
              pathname: `/address/${asset.issuer}`,
              state: { state: asset.state },
            }}
          >
            {asset.issuer}
          </StyledLink>
        </td>
      </tr>
      <tr>
        <StyledTD>Category</StyledTD>
        <td>
          <span id="lblocknum">{asset.category}</span>
        </td>
      </tr>
      <tr>
        <StyledTD>Divisible</StyledTD>
        <td>
          <span id="lblocknum">{asset.divisible ? 'True' : 'False'}</span>
        </td>
      </tr>
      <tr className="d-none">
        <StyledTD>Distribution</StyledTD>
        <td>
          <span id="lblocknum">Coming soon...</span>
        </td>
      </tr>
      {asseturl && (
        <tr>
          <StyledTD>URL</StyledTD>
          {asseturl}
        </tr>
      )}
      <tr className="d-none">
        <StyledTD>Price</StyledTD>
        <td>
          <span id="lblocknum">Coming soon...</span>
        </td>
      </tr>
      <tr className="d-none">
        <StyledTD>Markets</StyledTD>
        <td>
          <span id="lblocknum">Coming soon...</span>
        </td>
      </tr>
      <tr>
        <StyledTD>Raw Data</StyledTD>
        <td>
          <span id="lrawgettx">
            <StyledA href={rawAssetURL}>Click here for raw info</StyledA>
          </span>
        </td>
      </tr>
      <tr>
        <StyledTD>Registration</StyledTD>
        {registeredMessage}
      </tr>
    </tbody>
  );
}

AssetInfo.propTypes = {};

export default AssetInfo;
