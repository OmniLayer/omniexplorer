/**
 *
 * ExplorerLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import StyledA from 'components/StyledA';
import { EXTERNAL_EXPLORER_BLOCKCHAIR } from './constants';

const IMG = styled.img.attrs({
  className: 'explorer-logo',
})``;

const ExternalLink = styled(StyledA).attrs({
  target: '_blank',
  rel: 'nofollow noopener',
  className: 'other-explorer',
})``;

const blockchairLogo = require('images/external_logos/logo-blockchair.png');

const explorers = {
  [EXTERNAL_EXPLORER_BLOCKCHAIR]: {
    name: 'blockchair',
    pathbase: 'https://blockchair.com/bitcoin/transaction/',
    title: 'View on Blockchair',
    linkText: 'Blockchair',
    logo: blockchairLogo,
  },
};

function ExplorerLink({ explorerId, tx, className }) {
  const explorer = explorers[explorerId];
  const { logo } = explorer;
  const href = `${explorer.pathbase}${tx}`;

  return (
    <div className={className}>
      <ExternalLink href={href} title={explorer.title}>
        <IMG
          style={{
            width: '2rem',
            height: '2rem',
          }}
          src={logo}
          alt={explorer.name}
        />{' '}
        &nbsp;
        {explorer.linkText}
      </ExternalLink>
    </div>
  );
}

ExplorerLink.propTypes = {
  explorerId: PropTypes.string.isRequired,
  tx: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ExplorerLink;
