/*
 * TransactionListHeader Messages
 *
 * This contains all the text for the TransactionListHeader component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  unconfirmedHeader: {
    id: 'app.components.Transactions.unconfirmedHeader',
    defaultMessage: 'Unconfirmed Transactions',
    one: 'Unconfirmed Transaction',
    other: 'Unconfirmed Transactions',
    zero: 'Unconfirmed Transactions',
  },
  unconfirmedSuffix: {
    id: 'app.components.Transactions.unconfirmedHeader',
    defaultMessage: 'most recent',
    one: 'most recent',
    other: 'most recent',
    zero: 'most recent',
  },
  classABTxsHeader: {
    id: 'app.components.Transactions.unconfirmedHeader',
    defaultMessage: 'Class A/B transactions',
    one: 'Class A/B transaction',
    other: 'Class A/B transaction',
    zero: 'Class A/B transaction',
  },
  classABTxsSuffix: {
    id: 'app.components.Transactions.unconfirmedHeader',
    defaultMessage: 'most recent',
    one: 'most recent',
    other: 'most recent',
    zero: 'most recent',
  },
});
