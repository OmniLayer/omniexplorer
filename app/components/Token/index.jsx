/**
 *
 * Token
 *
 */

import React, { memo, useEffect } from 'react';
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

export function Token(props) {
  if (!props.bulkLoading) {
    useEffect(() => {
      if (props.id && props.id.toString().trim().length > 0) props.getProperty(props.id.toString());
    }, []);
  }

  const getTokenName = () => (props.propertyinfo || { name: '' }).name;

  let frozen;
  let reserved;
  let available;

  if (props.divisible) {
    frozen = props.frozen / 1e8;
    reserved = props.reserved ? props.reserved / 1e8 : 0;
    available = props.value / 1e8;
  } else {
    frozen = props.frozen;
    reserved = props.reserved;
    available = props.value;
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
        <AssetLink asset={props.id}>
          <AssetLogo
            asset={props.propertyinfo}
            prop={props.id}
            style={{
              width: '4rem',
              height: '4rem',
            }}
          />
        </AssetLink>
      </StyledTD>
      <StyledTD className="text-truncate" style={{ paddingTop: '13px' }}>
        <AssetLink asset={props.id}>
          {props.id}
        </AssetLink>
      </StyledTD>
      <StyledTD className="text-truncate" style={{ paddingTop: '13px' }}>
        <AssetLink asset={props.id}>
          {getTokenName()}
        </AssetLink>
      </StyledTD>
      <StyledTD style={{
        textAlign: 'right',
        paddingTop: '13px',
      }}>
        <strong>
          <SanitizedFormattedNumber
            value={value}
            forceDecimals={props.divisible}
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
          forceDecimals={props.divisible}
        />
      </StyledTD>
    </tr>
  );
}

Token.propTypes = {
  bulkLoading: PropTypes.bool,
  getProperty: PropTypes.func,
  divisible: PropTypes.bool,
  propertyinfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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

export default compose(
  withConnect,
  memo,
)(Token);
