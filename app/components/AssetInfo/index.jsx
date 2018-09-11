/**
 *
 * AssetInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import { API_URL_BASE } from 'containers/App/constants';

function AssetInfo(asset) {
  const rawAssetURL = `${API_URL_BASE}/property/${asset.propertyid}`;

  let tokenName;
  let propertyID;
  if (![4, -22, 25, 26].includes(asset.propertyid)) {
    tokenName = (
      <tr>
        <td className="field">Name</td>
        <td>
          <strong>{asset.name || asset.propertyname || asset.type}</strong>
        </td>
      </tr>
    );
    propertyID = (
      <tr>
        <td className="field">PropertyID</td>
        <td>
          <strong>#{asset.propertyid}</strong>
        </td>
      </tr>
    );
  }
  if (asset.propertyid === 28) {
    tokenName = (
      <tr>
        <td className="field">Ecosystem</td>
        <td>
          <strong>{asset.ecosystem}</strong>
        </td>
      </tr>
    );
  }

  let asseturl;
  if (asset.flags.duplicate || asset.flags.scam) {
    asseturl = (<td><strike>{ asset.url }</strike> See Warning - Be Careful</td>);
  } else {
    if (asset.url.includes('.')) {
      asseturl = (
        <td>
          <a href={asset.url} target="_blank">
            {asset.url}
          </a>
        </td>
      );
    } else {
      asseturl = <td>{asset.url}</td>;
    }
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
        <a href="/promote">Promote Your Property</a> for further details.
      </td>
    );
  }

  let assetData;
  if (asset.data) {
    assetData = (
      <tr>
        <td className="field">Data</td>
        <td>
          <span>{asset.data}</span>
        </td>
      </tr>
    );
  }

  return (
    <tbody>
      <tr>
        <td className="field">Total</td>
        <td>
          <strong>
            <SanitizedFormattedNumber value={asset.totaltokens} /> Tokens
          </strong>
        </td>
      </tr>
      {tokenName}
      {propertyID}
      <tr>
        <td className="field">Created</td>
        <td>
          <span id="ldatetime">
            <FormattedUnixDateTime datetime={asset.blocktime} />
          </span>
        </td>
      </tr>
      {assetData}
      <tr>
        <td className="field">Sender</td>
        <td>
          <Link
            to={{
              pathname: `/address/${asset.issuer}`,
            }}
            onClick={() => asset.changeRoute(`/address/${asset.issuer}`)}
          >
            {asset.issuer}
          </Link>
        </td>
      </tr>
      <tr>
        <td className="field">Category</td>
        <td>
          <span id="lblocknum">{asset.category}</span>
        </td>
      </tr>
      <tr>
        <td className="field">Divisible</td>
        <td>
          <span id="lblocknum">{asset.divisible ? 'True' : 'False'}</span>
        </td>
      </tr>
      <tr className="d-none">
        <td className="field">Distribution</td>
        <td>
          <span id="lblocknum">Coming soon...</span>
        </td>
      </tr>
      {asseturl && (
        <tr>
          <td className="field">URL</td>
          {asseturl}
        </tr>
      )}
      <tr className="d-none">
        <td className="field">Price</td>
        <td>
          <span id="lblocknum">Coming soon...</span>
        </td>
      </tr>
      <tr className="d-none">
        <td className="field">Markets</td>
        <td>
          <span id="lblocknum">Coming soon...</span>
        </td>
      </tr>
      <tr>
        <td className="field">Raw Data</td>
        <td>
          <span id="lrawgettx">
            <a href={rawAssetURL}>Click here for raw info</a>
          </span>
        </td>
      </tr>
      <tr>
        <td className="field">Registration</td>
        {registeredMessage}
      </tr>
    </tbody>
  );
}

AssetInfo.propTypes = {
  changeRoute: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(AssetInfo);
