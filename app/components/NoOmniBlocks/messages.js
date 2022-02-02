/*
 * NoOmniBlocks Messages
 *
 * This contains all the text for the NoOmniBlocks component.
 */
import React from 'react';
import { defineMessages } from 'react-intl';
import StyledA from 'components/StyledA';
import { getLayerName } from 'utils/getBlockchainName';

export default defineMessages({
  header: {
    id: 'app.components.NoOmniBlocks.header',
    defaultMessage: `No ${getLayerName()} blocks found`,
  },
  main: {
    id: 'app.components.NoOmniBlocks.main',
    defaultMessage:
      'If the block you are searching for was just broadcast it might\n' +
      '        take a few minutes for the network to pass it around for us to see\n' +
      '        it.',
  },
  secondaryOE: {
    id: 'app.components.NoOmniBlocks.secondaryOE',
    defaultMessage:
      'If the block you are searching for is a Bitcoin only\n' +
      'block you should use a bitcoin block explorer like\n' +
      '{link}',
    values: {
      link: <StyledA href="https://www.blockchair.com">blockchair.com</StyledA>,
    },
  },
  secondaryFTC: {
    id: 'app.components.NoOmniBlocks.secondaryFTC',
    defaultMessage:
      'If the block you are searching for is not found,\n' +
      'you can use a feathercoin explorer like\n' +
      '{link}',
    values: {
      link: (
        <StyledA href="https://explorer.feathercoin.com/">
          explorer.feathercoin.com
        </StyledA>
      ),
    },
  },
  secondaryLTC: {
    id: 'app.components.NoOmniBlocks.secondaryLTC',
    defaultMessage:
      'If the block you are searching for is not found,\n' +
      'you can use a LTC explorer like\n' +
      '{link}',
    values: {
      link: (
        <StyledA href="https://blockchair.com/litecoin">
          blockchair.com/litecoin
        </StyledA>
      ),
    },
  },
});
