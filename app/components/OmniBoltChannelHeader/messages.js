/*
 * OmniBoltChannelHeader Messages
 *
 * This contains all the text for the OmniBoltChannelHeader component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OmniBoltChannelHeader';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the OmniBoltChannelHeader component!',
  },
  columns: {
    number: {
      id: 'app.components.OmniBOLTChannels.columns.number',
      defaultMessage: ' ',
    },
    channelid: {
      id: 'app.components.OmniBOLTChannels.columns.channelid',
      defaultMessage: 'Channel Id',
    },
    propertyid: {
      id: 'app.components.OmniBOLTChannels.columns.propertyid',
      defaultMessage: 'Property Id',
    },
    balancea: {
      id: 'app.components.OmniBOLTChannels.columns.balancea',
      defaultMessage: 'Balance A',
    },
    balanceb: {
      id: 'app.components.OmniBOLTChannels.columns.balanceb',
      defaultMessage: 'Balance B',
    },
  },
});
