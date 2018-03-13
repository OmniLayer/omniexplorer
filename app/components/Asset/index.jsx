/**
*
* Asset
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Asset() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Asset.propTypes = {

};

export default Asset;
