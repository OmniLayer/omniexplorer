import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { IoMdHeart } from 'react-icons/io';
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
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            love: <IoMdHeart color="red" size={24}/>,
            author: <A href="http://www.omnilayer.org/">The Omni Foundation</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
