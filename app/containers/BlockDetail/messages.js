/*
 * BlockDetail Messages
 *
 * This contains all the text for the BlockDetail component.
 */
import { defineMessages } from 'react-intl';
import React from 'react';

export default defineMessages({
  header: {
    id: 'app.containers.BlockDetail.header',
    defaultMessage: `
    Block {blockNumber}, {txCount} Transactions, created at {timestamp}, {confirmations} confirmations
    {br}
    Block hash: {hash}
    `,
    one: 'Block',
    other: 'Blocks',
    zero: 'Blocks',
  },
  doesNotHaveTransactions: {
    header: {
      id: 'app.containers.BlockDetail.header',
      defaultMessage: 'Block {blockNumber}, {txCount} Transactions',
      one: 'Block',
      other: 'Blocks',
      zero: 'Blocks',
    },
    body:{
      id: 'app.containers.BlockDetail.doesNotHaveTransactions',
      defaultMessage: "Block {blockNumber} has no Omni Layer transactions",
    },
  },
});
