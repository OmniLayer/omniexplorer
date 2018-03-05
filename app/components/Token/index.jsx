/**
*
* Token
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

class Token extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
          token #{this.props.propoertyid}
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

};

export default Token;
