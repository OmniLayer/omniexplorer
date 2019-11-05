/**
 *
 * Token
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';

import styled from 'styled-components';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import { startFetch } from './actions';
import { makeSelectProperties } from './selectors';

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

class Token extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    
    this.getTokenName = () =>
      (
        this.props.properties.tokens[this.props.id.toString()] || {
          name: '',
        }
      ).name;
  }
  
  componentDidMount() {
    console.log('token did mount');
    this.props.getProperty(this.props.id.toString());
  }
  
  render() {
    let frozen;
    let reserved;
    let available;
    
    if (this.props.divisible) {
      frozen = this.props.frozen / 1e8;
      reserved = this.props.reserved ? this.props.reserved / 1e8 : 0;
      available = this.props.value / 1e8;
    } else {
      frozen = this.props.frozen;
      reserved = this.props.reserved;
      available = this.props.value;
    }
    
    let value;
    let vlabel;
    
    if (available == 0 && frozen > 0) {
      value = frozen;
      vlabel = ' Frozen!';
    } else {
      value = available;
    }
    
    return (
      <tr>
        <StyledTD style={{ width: '56px' }}>
          <AssetLink asset={this.props.id} state={this.props.state}>
            <AssetLogo
              asset={this.props.propertyinfo}
              prop={this.props.id}
              style={{
                width: '4rem',
                height: '4rem',
              }}
            />
          </AssetLink>
        </StyledTD>
        <StyledTD className="text-truncate" style={{ paddingTop: '13px' }}>
          <AssetLink asset={this.props.id} state={this.props.state}>
            {this.props.id}
          </AssetLink>
        </StyledTD>
        <StyledTD className="text-truncate" style={{ paddingTop: '13px' }}>
          <AssetLink asset={this.props.id} state={this.props.state}>
            {this.getTokenName()}
          </AssetLink>
        </StyledTD>
        <StyledTD style={{
          textAlign: 'right',
          paddingTop: '13px',
        }}>
          <strong>
            <SanitizedFormattedNumber
              value={value}
              forceDecimals={this.props.divisible}
            />
            {vlabel}
          </strong>
        </StyledTD>
        <StyledTD style={{
          textAlign: 'right',
          paddingTop: '13px',
        }}>
          <SanitizedFormattedNumber
            value={reserved}
            forceDecimals={this.props.divisible}
          />
        </StyledTD>
      </tr>
    );
  }
}

Token.propTypes = {
  getProperty: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  properties: makeSelectProperties(),
});

const mapDispatchToProps = (dispatch) => ({
  getProperty: propertyId => dispatch(startFetch(propertyId)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Token);
