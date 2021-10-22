/**
 *
 * ExplorerLink
 *
 */

import React from 'react';

import styled from 'styled-components';
import StyledA from 'components/StyledA';
import {
  EXTERNAL_EXPLORER_BLOCKCHAIR,
  EXTERNAL_EXPLORER_FEATHERCOIN,
} from './constants';

const IMG = styled.img.attrs({
  className: 'explorer-logo',
})``;

const ExternalLink = styled(StyledA).attrs({
  target: '_blank',
  rel: 'nofollow noopener',
  className: 'other-explorer',
})``;

const ftcLogo = require('images/external_logos/ftc-logo.png');
const blockchairLogo = require('images/external_logos/logo-blockchair.png');

const explorers = {
  [EXTERNAL_EXPLORER_BLOCKCHAIR]: {
    name: 'blockchair',
    pathbase: 'https://blockchair.com/bitcoin/transaction/',
    title: 'View on Blockchair',
    linkText: 'Blockchair',
    logo: blockchairLogo,
  },
  [EXTERNAL_EXPLORER_FEATHERCOIN]: {
    name: 'feathercoin',
    pathbase: 'https://explorer.feathercoin.com/tx/',
    title: 'View on Feathercoin',
    linkText: 'Feathercoin',
    logo: ftcLogo,
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

ExplorerLink.propTypes = {};

export default ExplorerLink;
