/**
 *
 * CrowdsaleInfo
 *
 */

import React from 'react';
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
              pathname: `/asset/${this.props.propertyid}`,
            }}
            onClick={() => this.props.changeRoute(`/asset/${this.props.propertyid}`)}
          >
            {this.props.name}
          </Link>
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          {`${this.props.propertyiddesiredname}(${this.props.propertyiddesired}) / Rate (`}
          <SanitizedFormattedNumber value={this.props.tokensperunit} />
          {')'}
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
          <SanitizedFormattedNumber value={this.props.tokensissued} />
        </StyledTDTextLeft>
      </tr>
    );
  }
}

CrowdsaleInfo.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, )(CrowdsaleInfo);

