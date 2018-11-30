/*
 * TransactionListHeader Messages
 *
 * This contains all the text for the TransactionListHeader component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.TransactionListHeader.header',
    defaultMessage: 'Latest Transactions',
    one: 'Transaction',
    other: 'Transactions',
    zero: 'Transactions',
  },
  transactionTypes: {
    id: 'app.components.TransactionListHeader.paginationTitle',
    defaultMessage: 'Show All Transaction Types',
  },
});
