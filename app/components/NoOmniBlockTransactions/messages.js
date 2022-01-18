/*
 * NoOmniBlockTransactions Messages
 *
 * This contains all the text for the NoOmniBlockTransactions component.
 */
import React from 'react';
import { defineMessages } from 'react-intl';
import StyledA from 'components/StyledA';

export default defineMessages({
  header: {
    id: 'app.components.NoOmniBlockTransactions.header',
    defaultMessage: 'Requested block not found',
  },
  main: {
    id: 'app.components.NoOmniBlockTransactions.main',
    defaultMessage:
      'If the transaction you are searching for was just broadcast it might take a few minutes for the network to pass it around for us to see it.',
  },
  secondaryOE: {
    id: 'app.components.NoOmniBlockTransactions.secondaryOE',
    defaultMessage:
      'If the transaction you are searching for is a Bitcoin only transaction you should use a bitcoin block explorer like {link}',
    values: {
      link: <StyledA href="https://www.blockchair.com">blockchair.com</StyledA>,
    },
  },
  secondaryFTC: {
    id: 'app.components.NoOmniBlockTransactions.secondaryFTC',
    defaultMessage:
      'If the transaction you are searching for is not found,\n' +
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
    id: 'app.components.NoOmniBlockTransactions.secondaryLTC',
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
