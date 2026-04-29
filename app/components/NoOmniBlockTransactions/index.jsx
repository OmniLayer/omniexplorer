/**
 *
 * NoOmniBlockTransactions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import StyledLink from 'components/StyledLink';
import { /* getLocationPath, */ getSufixURL } from 'utils/getLocationPath';
import messages from './messages';

const StyledH3 = styled.h3`
  padding: 3rem 0;
`;

function NoOmniBlockTransactions(props = { useDefaults: true }) {
  const secondaryMessage = messages.secondaryOE;

  return (
    <StyledH3 className="lead text-center">
      <p className="h3">
        {!props.header && props.useDefaults && (
          <FormattedMessage {...messages.main} />
        )}
        {props.header && props.header}
      </p>
      <p className="h5">
        {!props.mainText && props.useDefaults && (
          <FormattedMessage {...messages.main} />
        )}
        {props.mainText && props.mainText}
      </p>
      <p className="h5">
        <FormattedMessage {...secondaryMessage} />
      </p>
      <p className="text-center">
        <StyledLink
          to={{
            pathname: `${getSufixURL()}/blocks`,
            state: { state: props.state },
          }}
        >
          Navigate full block list...
        </StyledLink>
      </p>
    </StyledH3>
  );
}

NoOmniBlockTransactions.propTypes = {
  header: PropTypes.node,
  mainText: PropTypes.node,
  state: PropTypes.any,
  useDefaults: PropTypes.bool,
};

export default NoOmniBlockTransactions;
