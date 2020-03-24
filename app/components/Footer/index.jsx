import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heart } from '@styled-icons/fa-solid/Heart';
import StyledA from 'components/StyledA';
import messages from './messages';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  margin-top: 1rem;
  border-top: 1px solid #666;
`;

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            love: <Heart color="red" size={16} />,
            author: <StyledA href="http://www.omnilayer.org/">The Omni Foundation</StyledA>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
