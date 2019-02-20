/*
 * StatusConfirmation Messages
 *
 * This contains all the text for the StatusConfirmation component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.StatusConfirmation.header',
    defaultMessage: 'This is the StatusConfirmation component !',
  },
  confirmations: {
    id: 'app.components.StatusConfirmation.confirmations',
    defaultMessage: '{confirmations} CONFIRMATIONS',
    one: '{confirmations} CONFIRMATION',
    other: '{confirmations} CONFIRMATIONS',
    zero: '{confirmations} CONFIRMATIONS',
  },
  confirmed: {
    id: 'app.components.StatusConfirmation.confirmed',
    defaultMessage: 'CONFIRMED',
  },
  unconfirmed: {
    id: 'app.components.StatusConfirmation.unconfirmed',
    defaultMessage: 'UNCONFIRMED',
  },
  invalid: {
    id: 'app.components.StatusConfirmation.invalid',
    defaultMessage: 'INVALID',
  },
});
