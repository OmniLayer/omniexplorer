/*
 * NoOmniTransactions Messages
 *
 * This contains all the text for the NoOmniTransactions component.
 */
import { defineMessages } from 'react-intl';
import React from 'react';
import StyledA from 'components/StyledA';

export default defineMessages({
  header: {
    id: 'app.components.NoOmniTransactions.header',
    defaultMessage: 'No Omni Layer transactions found',
  },
  main: {
    id: 'app.components.NoOmniTransactions.main',
    defaultMessage:
      'If the transaction you are searching for was just broadcast it might\n' +
      '        take a few minutes for the network to pass it around for us to see\n' +
      '        it.',
  },
  secondary: {
    id: 'app.components.NoOmniTransactions.secondary',
    defaultMessage:
      'If the transaction you are searching for is a Bitcoin only\n' +
      'transaction you should use a bitcoin block explorer like\n' +
      '{link}',
    values: {
      link: <StyledA href="https://www.blockchair.com">blockchair.com</StyledA>,
    },
  },
});
