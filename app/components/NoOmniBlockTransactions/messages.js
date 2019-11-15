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
  secondary: {
    id: 'app.components.NoOmniBlockTransactions.secondary',
    defaultMessage:
      'If the transaction you are searching for is a Bitcoin only transaction you should use a bitcoin block explorer like {link}',
    values: {
      link: <StyledA href="https://www.blockchair.com">blockchair.com</StyledA>,
    },
  },
});
