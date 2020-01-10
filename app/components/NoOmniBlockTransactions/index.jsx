/**
 *
 * NoOmniBlockTransactions
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import StyledLink from 'components/StyledLink';
import messages from './messages';

const StyledH3 = styled.h3`
  padding: 3rem 0;
`;


function NoOmniBlockTransactions(props={useDefaults: true}) {
  return (
    <StyledH3 className="lead text-center">
      <p className="h3">
        {!props.header && props.useDefaults &&
        <FormattedMessage {...messages.main} />
        }
        {props.header &&
        props.header
        }
      </p>
      <p className="h5">
        {!props.mainText && props.useDefaults &&
        <FormattedMessage {...messages.main} />
        }
        {props.mainText &&
        props.mainText
        }
      </p>
      <p className="h5">
        {props.useDefaults &&
          <FormattedMessage {...messages.secondary} />
        }
      </p>
      <p className="text-center">
        <StyledLink
          to={{
            pathname: `/blocks`,
            state: { state: props.state },
          }}
        >
          Navigate full block list...
        </StyledLink>
      </p>
    </StyledH3>
  );
}

NoOmniBlockTransactions.propTypes = {};

export default NoOmniBlockTransactions;
