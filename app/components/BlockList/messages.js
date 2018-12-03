/*
 * BlockList Messages
 *
 * This contains all the text for the BlockList component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.BlockList.header',
    defaultMessage: 'This is the BlockList component !',
  },
  columns: {
    block: {
      id: 'app.components.BlockList.columns.block',
      defaultMessage: 'Height',
    },
    blockhash: {
      id: 'app.components.BlockList.columns.blockhash',
      defaultMessage: 'Hash',
    },
    txcount: {
      id: 'app.components.BlockList.columns.txcount',
      defaultMessage: 'Transactions',
    },
    usdvalue: {
      id: 'app.components.BlockList.columns.usdvalue',
      defaultMessage: 'USD Value',
    },
    timestamp: {
      id: 'app.components.BlockList.columns.timestamp',
      defaultMessage: 'Timestamp',
    },
    txtooltip: {
      id: 'app.components.BlockList.columns.txtooltip',
      defaultMessage: 'This represents the number of Omni Protocol Transactions in the block',
    },
    usdtooltip: {
      id: 'app.components.BlockList.columns.usdooltip',
      defaultMessage: 'The value is rounded to the nearest dollar',
    },
  },
});
