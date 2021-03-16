/*
 * OmniBOLTChannels Messages
 *
 * This contains all the text for the OmniBOLTChannels component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OmniBOLTChannelsList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'OmniBOLT Channels List',
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
