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
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectProperties } from './selectors';
import reducer from './reducer';
import { startFetch } from './actions';
import saga from './saga';

class Token extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getProperty(this.props.id.toString());
  }

  render() {
    const getLogo = (id) => {
      let logo;
      try {
        logo = require(`images/token${id}.png`);
      } catch (e) {
        logo = require('images/tokendefault.png');
      }
      return logo;
    };
    const token = this.props.properties.get('tokens').get(this.props.id.toString());
    
    return (
      <tr>
        <td style={{ width: '56px' }}>
          <img
            style={{ width: '24px', height: '24px' }}
            src={getLogo(this.props.id)}
          />
        </td>
        <td style={{ paddingTop: '13px' }}>
          { this.props.id }
        </td>
        <td style={{ paddingTop: '13px' }}>
          { (token ? token.name : '') }
        </td>
        <td style={{ textAlign: 'right', paddingTop: '13px' }}>
          { this.props.reserved }
        </td>
        <td style={{ textAlign: 'right', paddingTop: '13px' }}>
          <strong>
            { (this.props.value) / 1e8 }
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
  // property: makeSelectProperty(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProperty: (propertyId) => dispatch(startFetch(propertyId)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'tokenDetail', reducer });
const withSaga = injectSaga({ key: 'tokenDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Token);
