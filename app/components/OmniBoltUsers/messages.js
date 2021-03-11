
/*
 * OmniBOLTUsersList Messages
 *
 * This contains all the text for the OmniBOLTUsersList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OmniBOLTUsersList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the OmniBOLTUsersList component!',
  },
  columns: {
    obdp2pnodeid: {
      id: 'app.components.OmniBOLTUsers.columns.obdp2pnodeid',
      defaultMessage: 'OBD P2P Node Id',
    },
    online: {
      id: 'app.components.OmniBOLTUsers.columns.online',
      defaultMessage: 'Online',
    },
    obdnodeid: {
      id: 'app.components.OmniBOLTUsers.columns.obdnodeid',
      defaultMessage: 'OBD Node Id',
    },
    userid: {
      id: 'app.components.OmniBOLTUsers.columns.userid',
      defaultMessage: 'User Id',
    },
    offlinetime: {
      id: 'app.components.OmniBOLTUsers.columns.offlinetime',
      defaultMessage: 'Offline Time',
    },
  },
});
