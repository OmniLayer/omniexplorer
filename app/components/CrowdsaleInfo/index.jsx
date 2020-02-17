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

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

const StyledTDTextLeft = styled(StyledTD).attrs({
  className: 'text-left pt-3',
})`
  white-space: pre-wrap;
`;

class CrowdsaleInfo extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    
    return (
      <tr>
        <StyledTD>
          <AssetLink
            asset={this.props.propertyid}
            state={this.props.state}
            basepath="/crowdsale"
          >
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
        <StyledTDTextLeft>
          <AssetLink
            asset={this.props.propertyid}
            state={this.props.state}
            basepath="/crowdsale"
          >
            {this.props.name}
            <br/>
            {`(#${this.props.propertyid})`}
          </AssetLink>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <AssetLink
            asset={this.props.propertyiddesired}
            state={this.props.state}
          >
            {this.props.propertydesired.name}
            <br/>
            {`(#${this.props.propertyiddesired})`}
          </AssetLink>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <SanitizedFormattedNumber
            value={this.props.tokensperunit}
            forceDecimals
          />
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <span>
            <FormattedUnixDateTime
              datetime={this.props.deadline}
              useSeconds={false}
            />
          </span>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <SanitizedFormattedNumber
            value={this.props.totaltokens}
            fractionDigits={8}
          />
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <StyledA
            className="btn btn-primary"
            target="_blank"
            href={`https://www.omniwallet.org/assets/details/${
              this.props.propertyid
              }`}
          >
            Buy with
            <br/>
            Omniwallet
          </StyledA>
        </StyledTDTextLeft>
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
