/*
 * Menu Messages
 *
 * This contains all the text for the Menu component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Menu';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Menu component!',
  },
});
