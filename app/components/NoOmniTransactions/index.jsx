/**
 *
 * NoOmniTransactions
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import messages from './messages';

const StyledH3 = styled.h3`
  padding: 3rem 0;
`;

function NoOmniTransactions() {
  const secondaryMessage = messages.secondaryOE;

  return (
    <StyledH3 className="lead text-center">
      <p className="h3">
        <FormattedMessage {...messages.header} />
      </p>
      <p className="h5">
        <FormattedMessage {...messages.main} />
      </p>
      <p className="h5 ">
        <FormattedMessage {...secondaryMessage} />
      </p>
    </StyledH3>
  );
}

NoOmniTransactions.propTypes = {};

export default NoOmniTransactions;
