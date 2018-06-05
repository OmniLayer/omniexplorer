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
    return (
      <tr>
        <StyledTDTextLeft>
          <Link
            to={{
              pathname: `/crowdsale/${this.props.propertyid}`,
            }}
            onClick={() => this.props.changeRoute(`/crowdsale/${this.props.propertyid}`)}
          >
            {this.props.name}
          </Link>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <Link
            to={{
              pathname: `/asset/${this.props.propertyiddesired}`,
            }}
            onClick={() => this.props.changeRoute(`/asset/${this.props.propertyiddesired}`)}
          >
            {`${this.props.propertyiddesiredname} (#${this.props.propertyiddesired})`}
          </Link>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <SanitizedFormattedNumber value={this.props.tokensperunit} />
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <span>
            <FormattedUnixDateTime datetime={this.props.deadline} />
          </span>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <SanitizedFormattedNumber value={this.props.totaltokens} />
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <a className="btn btn-primary btn-lg" target="_blank" href="http://www.omnilayer.org/">
            Buy with Omniwallet
          </a>
        </StyledTDTextLeft>
      </tr>
    );
  }
}

CrowdsaleInfo.propTypes = {
  name: PropTypes.string.isRequired,
  propertyid: PropTypes.number.isRequired,
  propertyiddesiredname: PropTypes.string.isRequired,
  tokensissued: PropTypes.string.isRequired,
  totaltokens: PropTypes.string.isRequired,
  deadline: PropTypes.number.isRequired,
  tokensperunit: PropTypes.string.isRequired,
  propertyiddesired: PropTypes.number.isRequired,
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
