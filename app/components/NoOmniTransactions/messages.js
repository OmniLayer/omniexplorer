/*
 * NoOmniTransactions Messages
 *
 * This contains all the text for the NoOmniTransactions component.
 */
import { defineMessages } from 'react-intl';
import React from 'react';
import StyledA from 'components/StyledA';
import { getLayerName } from 'utils/getBlockchainName';

export default defineMessages({
  header: {
    id: 'app.components.NoOmniTransactions.header',
    defaultMessage: `No ${getLayerName()} transactions found`,
  },
  main: {
    id: 'app.components.NoOmniTransactions.main',
    defaultMessage:
      'If the transaction you are searching for was just broadcast it might\n' +
      'take a few minutes for the network to pass it around for us to see it',
  },
  secondaryOE: {
    id: 'app.components.NoOmniTransactions.secondaryOE',
    defaultMessage:
      'If the transaction you are searching for is a Bitcoin only transaction you should use a bitcoin block explorer like {link}',
    values: {
      link: <StyledA href="https://www.blockchair.com">blockchair.com</StyledA>,
    },
  },
  secondaryFTC: {
    id: 'app.components.NoOmniTransactions.secondaryFTC',
    defaultMessage:
      `If the transaction you are searching for is not found,
       you can use a feathercoin explorer like {link}`,
    values: {
      link: (
        <StyledA href="https://explorer.feathercoin.com/">
          explorer.feathercoin.com
        </StyledA>
      ),
    },
  },
  secondaryLTC: {
    id: 'app.components.NoOmniTransactions.secondaryLTC',
    defaultMessage:
      'If the transaction you are searching for is not found,\n' +
      'you can use a feathercoin explorer like\n' +
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
