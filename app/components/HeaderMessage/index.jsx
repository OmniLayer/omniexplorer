/**
*
* HeaderMessage
*
*/

import React from 'react';
import { Alert } from 'reactstrap';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


function HeaderMessage() {
  return (
    <Alert color="info">
      <FormattedMessage {...messages.header} />
    </Alert>
  );
}

HeaderMessage.propTypes = {

};

export default HeaderMessage;
