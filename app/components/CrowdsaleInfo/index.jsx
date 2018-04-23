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

import { startFetch } from 'components/Token/actions';
import { makeSelectProperty } from 'components/Token/selectors';
import styled from 'styled-components';

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

const StyledTDTextLeft = styled(StyledTD).attrs({
  className: 'text-left pt-3 text-truncate',
})`
  max-width: 1rem;
`;

class CrowdsaleInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    
    this.props.getProperty(this.props.propertyid.toString());
  }
  
  render() {
    const assetId = this.props.propertyid.toString();
    const assetDesiredId = this.props.propertyiddesired.toString();
    
    const asset = this.props.properties(assetId);
    const assetDesired = this.props.properties(assetDesiredId);
  
    if (!assetDesired) return null;
    
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
          BitStrapAccessToken (24) / Rate (100000000.00000000)
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <SanitizedFormattedNumber value={this.props.totaltokens} />
        </StyledTDTextLeft>
        <StyledTDTextLeft>
          <SanitizedFormattedNumber value={this.props.totaltokens} />
        </StyledTDTextLeft>
      </tr>
    );
  }
}

CrowdsaleInfo.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  properties: (state) => makeSelectProperty(state),
});

function mapDispatchToProps(dispatch) {
  return {
    getProperty: (propertyId) => dispatch(startFetch(propertyId)),
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(CrowdsaleInfo);

