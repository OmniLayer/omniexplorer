/**
 *
 * Token
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectProperty, makeSelectProperties } from './selectors';
import { startFetch } from './actions';

class Token extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.getLogo = () => {
      let logo;
      try {
        logo = require(`images/token${this.props.id}.png`);
      } catch (e) {
        logo = require('images/tokendefault.png');
      }
      return logo;
    };
    this.getTokenName = () => (this.props.properties.get('tokens').get(this.props.id.toString()) || { name: '' }).name;
  }

  componentDidMount() {
    console.log('token did mount');
    this.props.getProperty(this.props.id.toString());
  }

  render() {

    let frozen;
    let reserved;
    let available;
    if ( this.props.divisible ) {
      frozen = (this.props.frozen) / 1e8;
      reserved = (this.props.reserved) / 1e8;
      available = (this.props.value) / 1e8;
    } else {
      frozen = this.props.frozen;
      reserved = this.props.reserved;
      available = this.props.value;
    }

    return (
      <tr>
        <td style={{ width: '56px' }}>
          <img
            style={{ width: '24px', height: '24px' }}
            src={this.getLogo()}
          />
        </td>
        <td style={{ paddingTop: '13px' }}>
          { this.props.id }
        </td>
        <td style={{ paddingTop: '13px' }}>
          { this.getTokenName() }
        </td>
        <td style={{ textAlign: 'right', paddingTop: '13px' }}>
          { frozen }
        </td>
        <td style={{ textAlign: 'right', paddingTop: '13px' }}>
          { reserved }
        </td>
        <td style={{ textAlign: 'right', paddingTop: '13px' }}>
          <strong>
            { available }
          </strong>
        </td>
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

function mapDispatchToProps(dispatch) {
  return {
    getProperty: (propertyId) => dispatch(startFetch(propertyId)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Token);
