/**
 *
 * FooterLinks
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Col } from 'reactstrap';

import StyledLink from 'components/StyledLink';
import FooterRow from 'components/FooterRow';
import GreenArrowForward from 'components/GreenArrowForward';
import getLocationPath, {getSufixURL} from 'utils/getLocationPath';
import messages from './messages';

const Div = styled.div.attrs({
  className: 'pb-1 pt-1 d-inline',
})`
`;

function FooterLinks(props) {
  return (
    <Div>
      {props.blocklist && (
        <FooterRow>
          <Col sm>
            <StyledLink
              onClick={()=>()=>window.location.reload}
              to={{
                pathname: `${getSufixURL()}/blocks`,
                state: { state: {} },
              }}
              key={Date.now()}
            >
              <GreenArrowForward size={20} className="m-1" />
              <FormattedMessage {...messages.navigateFullBlockList} />
            </StyledLink>
          </Col>
        </FooterRow>
      )}
      {props.unconfirmed && (
        <FooterRow>
          <Col sm>
            <StyledLink
              onClick={()=>()=>window.location.reload}
              to={{
                pathname: `${getSufixURL()}/transactions/unconfirmed`,
                state: {},
              }}
              key={Date.now()}
            >
              <GreenArrowForward size={20} className="m-1" />
              <FormattedMessage {...messages.unconfirmedTransactionsList} />
            </StyledLink>
          </Col>
        </FooterRow>
      )}
    </Div>
  );
}

FooterLinks.propTypes = {};

export default FooterLinks;
