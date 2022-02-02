/**
 *
 * EmptyBlockMessage
 *
 */

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import isOmniFeather from 'utils/isOmniFeather';
import isLTC from 'utils/isLTC';
import messages from './messages';

const StyledH3 = styled.h3`
  padding: 3rem 0;
`;

function EmptyBlockMessage() {
  let secondaryMessage = messages.secondaryOE;

  if (isOmniFeather) {
    secondaryMessage = messages.secondaryFTC;
  }

  if (isLTC) {
    secondaryMessage = messages.secondaryLTC;
  }

  return (
    <StyledH3 className="lead text-center">
      <p className="h3">
        <FormattedMessage {...messages.header} />
      </p>
      <p className="h4">
        <FormattedMessage {...messages.main} />
      </p>
      <p className="h5">
        <FormattedMessage {...secondaryMessage} />
      </p>
    </StyledH3>
  );
}

EmptyBlockMessage.propTypes = {};

export default EmptyBlockMessage;
