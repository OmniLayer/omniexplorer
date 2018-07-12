/*
 * Asset Messages
 *
 * This contains all the text for the Asset component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  datetime: {
    id: 'app.components.FormattedDateTime.datetime',
    defaultMessage: '{date} {hour}',
  },
  utc: {
    id: 'app.components.FormattedDateTime.utc',
    defaultMessage: 'UTC',
  },
});
