/**
 *
 * CrowdsaleInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { routeActions } from 'redux-simple-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';

import styled from 'styled-components';
import getLogo from 'utils/getLogo';

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

const StyledTDTextLeft = styled(StyledTD).attrs({
  className: 'text-left pt-3',
})`
  white-space: pre-wrap;
`;

class CrowdsaleInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const logo = getLogo(this.props.propertyid, this.props.propertydesired);
    return (
      <tr>
        <StyledTD>
          <img
            style={{
              width: '4rem',
              height: '4rem',
            }}
            src={logo}
            alt={this.props.name}
          />
        </StyledTD>
        <StyledTDTextLeft>
          <Link
            to={{
              pathname: `/crowdsale/${this.props.propertyid}`,
            }}
            onClick={() => this.props.changeRoute(`/crowdsale/${this.props.propertyid}`)}
          >
            {this.props.name}
            <br/>
            {`(#${this.props.propertyid})`}
          </Link>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <Link
            to={{
              pathname: `/asset/${this.props.propertyiddesired}`,
            }}
            onClick={() => this.props.changeRoute(`/asset/${this.props.propertyiddesired}`)}
          >
            {this.props.propertydesired.name}
            <br/>
            {`(#${this.props.propertyiddesired})`}
          </Link>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <SanitizedFormattedNumber value={this.props.tokensperunit} forceDecimals={true}/>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <span>
            <FormattedUnixDateTime datetime={this.props.deadline} useSeconds={false}/>
          </span>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <SanitizedFormattedNumber value={this.props.totaltokens} fractionDigits={8}/>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <a className="btn btn-primary" target="_blank"
             href={`https://www.omniwallet.org/assets/details/${this.props.propertyid}`}>
            Buy with
            <br/>
            Omniwallet
          </a>
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
  changeRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(CrowdsaleInfo);
