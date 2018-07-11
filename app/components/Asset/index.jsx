/**
*
* Asset
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Asset(props) {
  const getLogo = (id) => {
    let logo;
    try {
      logo = require(`images/token${id}.png`);
    } catch (e) {
      if (id > 2147483650) {
        logo = require('images/tokenwarn.png');
      } else {
        logo = require('images/tokendefault.png');
      }
    }
    return logo;
  };

  return (
    <tr>
      <td style={{ width: '56px' }}>
        <img
          style={{ width: '24px', height: '24px' }}
          src={getLogo(props[0])}
        />
      </td>
      <td className="text-left pt-3">
        { props[0] }
      </td>
      <td className="text-left pt-3">
        <Link
          to={{
            pathname: `/asset/${props[0]}`,
          }}
          onClick={() => props.changeRoute(`/asset/${props[0]}`)}
        >
          { props[1] }
        </Link>
      </td>
      <td className="text-left pt-3">
        <Link
          to={{
            pathname: `/address/${props[2]}`,
          }}
          onClick={() => props.changeRoute(`/address/${props[2]}`)}
        >
          { props[2] }
        </Link>
      </td>
    </tr>
  );
}

Asset.propTypes = {

};

export default Asset;
