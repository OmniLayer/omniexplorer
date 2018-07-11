/**
 *
 * Token
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

import { startFetch } from './actions';

class Token extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.getLogo = () => {
      let logo;
      try {
        logo = require(`images/token${this.props.id}.png`);
      } catch (e) {
        if (this.props.id > 2147483650) {
          logo = require('images/tokenwarn.png');
        } else {
          logo = require('images/tokendefault.png');
        }
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

    if (this.props.divisible) {
      frozen = (this.props.frozen) / 1e8;
      reserved = (this.props.reserved ? this.props.reserved / 1e8 : 0);
      available = (this.props.value) / 1e8;
    } else {
      frozen = this.props.frozen;
      reserved = this.props.reserved;
      available = this.props.value;
    }

    let value;
    let vlabel;
    if (available == 0 && frozen > 0) {
      value = frozen;
      vlabel = " Frozen!"
    } else {
      value = available;
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
          <Link
            to={{
              pathname: `/asset/${this.props.id}`,
            }}
            onClick={() => this.props.changeRoute(`/asset/${this.props.id}`)}
          >
            { this.props.id }
          </Link>
        </td>
        <td style={{ paddingTop: '13px' }}>
          <Link
            to={{
              pathname: `/asset/${this.props.id}`,
            }}
            onClick={() => this.props.changeRoute(`/asset/${this.props.id}`)}
          >
            { this.getTokenName() }
          </Link>
        </td>
        <td style={{ textAlign: 'right', paddingTop: '13px' }}>
          <SanitizedFormattedNumber value={reserved} />
        </td>
        <td style={{ textAlign: 'right', paddingTop: '13px' }}>
          <strong>
            <SanitizedFormattedNumber value={value} />{vlabel}
          </strong>
        </td>
      </tr>
    );
  }
}

Token.propTypes = {
  getProperty: PropTypes.func,
  changeRoute: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    properties: state.get('token'),
  };
}

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
)(Token);
