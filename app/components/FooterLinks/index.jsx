/**
 *
 * FooterLinks
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import StyledLink from 'components/StyledLink';
import FooterRow from 'components/FooterRow';
import { Col } from 'reactstrap';

import styled from 'styled-components';

const Div = styled.div.attrs({
  className: 'pb-1 pt-1 d-inline',
})`
  background-color: #7c8fa0;
  `;

function FooterLinks(props) {
  return (
    <Div>
      {props.blocklist &&
      <FooterRow>
        <Col sm>
          <StyledLink
            onClick={window.location.reload}
            to={{
              pathname: `/blocks`,
              state: { state: {} },
            }}
            key={Date.now()}
          >
            <FormattedMessage {...messages.navigateFullBlockList} />
          </StyledLink>
        </Col>
      </FooterRow>
      }
      {props.unconfirmed &&
      <FooterRow>
        <Col sm>
          <StyledLink
            onClick={window.location.reload}
            to={{
              pathname: `/transactions/unconfirmed`,
              state: {},
            }}
            key={Date.now()}
          >
            <FormattedMessage {...messages.unconfirmedTransactionsList} />
          </StyledLink>
        </Col>
      </FooterRow>
      }
    </Div>
  );
}

FooterLinks.propTypes = {};

export default FooterLinks;
