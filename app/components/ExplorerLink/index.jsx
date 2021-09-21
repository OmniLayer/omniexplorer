/**
 *
 * ExplorerLink
 *
 */

import React from 'react';

import styled from 'styled-components';
import { EXTERNAL_EXPLORER_BLOCKCHAIR, EXTERNAL_EXPLORER_FEATHERCOIN } from './constants';

const IMG = styled.img.attrs({
  className: "explorer-logo",
})``;

const ExternalLink = styled.a.attrs({
  target: "_blank",
  rel: "nofollow noopener",
  className: "other-explorer",
})``;

const ExplorerName = styled.span.attrs({
  className: "explorer-name",
})`
  color: #337ab7;
`;

const explorers = {
  [EXTERNAL_EXPLORER_BLOCKCHAIR]: {
    name: 'blockchair',
    pathbase: 'https://blockchair.com/bitcoin/transaction/',
    title: 'View on Blockchair',
    linkText: 'Blockchair',
  },
  [EXTERNAL_EXPLORER_FEATHERCOIN]: {
    name: 'feathercoin',
    pathbase: 'https://explorer.feathercoin.com/tx/',
    title: 'View on Feathercoin',
    linkText: 'Feathercoin',
  },
};

function ExplorerLink({ explorerId, tx, className }) {
  const explorer = explorers[explorerId];
  const logo = require(`images/external_logos/logo-${explorer.name}.png`);
  const href = `${explorer.pathbase}${tx}`;

  return (
    <div className={className}>
      <ExternalLink href={href} title={explorer.title}>
        <IMG src={logo} alt={explorer.name} /> &nbsp;
        <ExplorerName>
          { explorer.linkText }
        </ExplorerName>
      </ExternalLink>
    </div>
  );
}

ExplorerLink.propTypes = {};

export default ExplorerLink;
