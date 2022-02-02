import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heart } from '@styled-icons/fa-solid/Heart';
import { Col, NavLink, Row } from 'reactstrap';

import EcosystemLogo from 'components/EcosystemLogo';
import StyledA from 'components/StyledA';
import getLocationPath from 'utils/getLocationPath';
const version = require('../../../package.json').version;

import messages from './messages';

const Wrapper = styled.footer`
  padding: 2rem 1rem;
  margin-top: 1rem;
  &,
  a.nav-link {
    background-color: #10171d !important;
    color: white !important;

    font-size: 1.2rem;
    line-height: 2rem;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Row noGutters className="d-none d-md-flex">
        <Col sm>
          <div>
            <h4>Blockchain</h4>
            <EcosystemLogo />
          </div>
        </Col>
        <Col sm>
          <div>
            <h4>Developers</h4>
            <NavLink
              href="https://github.com/OmniLayer/omniexplorer"
              target="_blank"
            >
              Github
            </NavLink>
            <NavLink href={getLocationPath()} target="_blank">
              Documentation
            </NavLink>
            <NavLink
              href="https://github.com/OmniLayer/omniexplorer/issues"
              target="_blank"
            >
              Requests & Issues
            </NavLink>
            <NavLink href="https://hub.docker.com/u/omnilayer" target="_blank">
              Omni Layer docker
            </NavLink>
          </div>
        </Col>
        <Col sm>
          <div>
            <h4>About us</h4>
            <NavLink href="https://www.omnilayer.org/" target="_blank">
              Omni Layer Foundation
            </NavLink>
            <NavLink href="http://omniwallet.org/" target="_blank">
              Omni Wallet
            </NavLink>
            <NavLink href="https://twitter.com/Omni_Layer" target="_blank">
              Twitter
            </NavLink>
            <NavLink href="https://blog.omni.foundation/" target="_blank">
              Blog
            </NavLink>
          </div>
        </Col>
      </Row>
      <Row noGutters>
        <Col sm>
          <FormattedMessage {...messages.licenseMessage} />
        </Col>
        <Col sm className="text-md-right">
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              love: <Heart color="red" size={16} />,
              author: (
                <StyledA href="http://www.omnilayer.org/">
                  The Omni Foundation
                </StyledA>
              ),
            }}
          />
        </Col>
      </Row>
      <Row noGutters>
        <Col sm>
          <span>Data provided by: </span>
          <StyledA href={getLocationPath()}>
            {getLocationPath()}
          </StyledA>
        </Col>
        <Col sm className="text-md-right">
          version: {version}
        </Col>
      </Row>
    </Wrapper>
  );
}

export default Footer;
