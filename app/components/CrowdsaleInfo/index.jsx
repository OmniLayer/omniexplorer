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

// // Estimated early bird bonus calculation
// $scope.$watch(function(){ return $scope.deadline ? $scope.deadline.getTime() + $scope.earlyBirdBonus : 0;}, function(value){
//   if(value > 0){
//     var utcNow = new Date((new Date()).getTime() + (new Date()).getTimezoneOffset() * 60000);
//     $scope.initialEarlyBirdBonus = (((($scope.deadline.getTime() / 1000) - (utcNow.getTime() /1000 + 1800)) /604800 ) * $scope.earlyBirdBonus).toFixed(2);
//     $scope.initialEarlyBirdBonus = $scope.initialEarlyBirdBonus > 0 ? $scope.initialEarlyBirdBonus : 0.00;
//   } else
//     $scope.initialEarlyBirdBonus = 0
// });

// $scope.earlyBirdBonus =  ((($scope.property.deadline - (now.getTime()/1000)) / 604800) * $scope.property.earlybonus).toFixed(1);

// {{'CROWDSALE.DETAILS.YOUR' | translate}} {{'CROWDSALE.DETAILS.ACTIVE.' + property.active.toString().toUpperCase() | translate}}
// {{'CROWDSALE.DETAILS.TIME' | translate}}:
//
// {{'CROWDSALE.DETAILS.TOKENSBOUGHT' | translate}}
// {{'CROWDSALE.DETAILS.TOKENSISSUER' | translate}} ({{property.percenttoissuer}}%)
// {{'CROWDSALE.DETAILS.CURRENTBONUS' | translate}}
// +{{earlyBirdBonus}}%
// {{'CROWDSALE.DETAILS.GETTOKENS' | translate}}
// {{'CROWDSALE.DETAILS.PARTICIPATE' | translate}}
// {{'CROWDSALE.DETAILS.NOTOKENS' | translate}}
// {{'CROWDSALE.DETAILS.LOGIN' | translate}}
