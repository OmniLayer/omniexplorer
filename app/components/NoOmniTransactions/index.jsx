/**
*
* NoOmniTransactions
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styled from 'styled-components';

function NoOmniTransactions() {
  const StyledH3 = styled.h3`
      padding: 3rem 0;
    `;

  return (
    <StyledH3 className="lead text-center">
      <p className="h3">
        <FormattedMessage {...messages.header} />
      </p>
      <p className="h5">
        <FormattedMessage {...messages.main} />
      </p>
      <p className="h5">
        <FormattedMessage {...messages.secondary} />
      </p>
    </StyledH3>
  );
}

NoOmniTransactions.propTypes = {

};

export default NoOmniTransactions;
