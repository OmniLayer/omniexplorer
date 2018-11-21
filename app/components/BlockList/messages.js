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
    timestamp: {
      id: 'app.components.BlockList.columns.timestamp',
      defaultMessage: 'Timestamp',
    },
  },
});
