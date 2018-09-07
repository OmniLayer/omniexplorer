/*
 * Wallet Messages
 *
 * This contains all the text for the Wallet component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  flagged: {
    id: 'app.components.Wallet.flagged',
    defaultMessage: 'Show/hide known duplicate/spam/scam tokens in this wallet',
  },
  hasNotFlagged: {
    id: 'app.components.Wallet.hasNotFlagged',
    defaultMessage: 'There aren\'t flagged properties in this address',
  }
});
