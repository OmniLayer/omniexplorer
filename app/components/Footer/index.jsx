import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import HeartIcon from 'react-icons/lib/io/heart';
import messages from './messages';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  margin-top: 1rem;
  border-top: 1px solid #666;
`;

const A = styled.a`
  color: #41addd;

  &:hover {
    color: #6cc0e5;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
        <p>Donate USDT: 1LrRGSLxQoRVFcZW3xEwy4awiD5qhL8QMf</p>
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            love: <HeartIcon color="red" size={24} />,
            author: 'The Omni Foundation',
            guarda_url: <A href="https://guarda.co/">guarda</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
