/**
 *
 * CrowdsaleInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';

import styled from 'styled-components';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import StyledA from 'components/StyledA';

import isOmniExplorer from 'utils/isOmniExplorer';

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

class CrowdsaleInfo extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <tr>
        <StyledTD>
          <AssetLink asset={this.props.propertyid} basepath="/crowdsale">
            <AssetLogo
              asset={this.props}
              prop={this.props.propertyid}
              style={{
                width: '4rem',
                height: '4rem',
              }}
            />
          </AssetLink>
        </StyledTD>
        <StyledTD>
          <AssetLink asset={this.props.propertyid} basepath="/crowdsale">
            {this.props.name}
            <br />
            {`(#${this.props.propertyid})`}
          </AssetLink>
        </StyledTD>
        <StyledTD>
          <AssetLink asset={this.props.propertyiddesired}>
            {this.props.propertydesired.name}
            <br />
            {`(#${this.props.propertyiddesired})`}
          </AssetLink>
        </StyledTD>
        <StyledTD className="text-right">
          <SanitizedFormattedNumber
            value={this.props.tokensperunit}
            forceDecimals
          />
        </StyledTD>
        <StyledTD className="text-center">
          <span>
            <FormattedUnixDateTime
              datetime={this.props.deadline}
              useSeconds={false}
            />
          </span>
        </StyledTD>
        <StyledTD className="text-right">
          <SanitizedFormattedNumber
            value={this.props.totaltokens}
            fractionDigits={8}
          />
        </StyledTD>
        {isOmniExplorer && (
          <StyledTD>
            <StyledA
              className="btn btn-primary"
              target="_blank"
              href={`https://www.omniwallet.org/assets/details/${
                this.props.propertyid
              }`}
            >
              Buy with
              <br />
              Omniwallet
            </StyledA>
          </StyledTD>
        )}
      </tr>
    );
  }
}

CrowdsaleInfo.propTypes = {
  name: PropTypes.string.isRequired,
  propertyid: PropTypes.number.isRequired,
  propertydesired: PropTypes.any.isRequired,
  totaltokens: PropTypes.string.isRequired,
  deadline: PropTypes.number.isRequired,
  tokensperunit: PropTypes.string.isRequired,
  propertyiddesired: PropTypes.any.isRequired,
  state: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(CrowdsaleInfo);
