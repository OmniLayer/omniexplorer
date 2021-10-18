/*
 * EmptyBlockMessage Messages
 *
 * This contains all the text for the EmptyBlockMessage component.
 */
import React from 'react';
import { defineMessages } from 'react-intl';
import StyledA from 'components/StyledA';
import { getLayerName } from 'utils/getBlockchainName';

export default defineMessages({
  header: {
    id: 'app.components.EmptyBlockMessage.header',
    defaultMessage: `No ${getLayerName()} blocks with transactions found`,
  },
  main: {
    id: 'app.components.EmptyBlockMessage.main',
    defaultMessage:
      'Try looking into Older/Newer blocks.',
  },
  secondary: {
    id: 'app.components.EmptyBlockMessage.secondary',
    defaultMessage:
      'If the block you are searching for is a Bitcoin only\n' +
      'block you should use a bitcoin block explorer like\n' +
      '{link}',
    values: {
      link: <StyledA href="https://www.blockchair.com">blockchair.com</StyledA>,
    },
  },
});
