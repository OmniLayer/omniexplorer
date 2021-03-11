/*
 * OmniBOLTNodeList Messages
 *
 * This contains all the text for the OmniBOLTNodeList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OmniBOLTNodeList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the OmniBOLTNodeList component!',
  },
  columns: {
    number: {
      id: 'app.components.OmniBOLTNodes.columns.number',
      defaultMessage: ' ',
    },
    online: {
      id: 'app.components.OmniBOLTNodes.columns.online',
      defaultMessage: 'Online',
    },
    id: {
      id: 'app.components.OmniBOLTNodes.columns.id',
      defaultMessage: 'Node Id',
    },
    p2paddress: {
      id: 'app.components.OmniBOLTNodes.columns.p2paddress',
      defaultMessage: 'P2P Address',
    },
    loginip: {
      id: 'app.components.OmniBOLTNodes.columns.loginip',
      defaultMessage: 'Login IP',
    },
    logintime: {
      id: 'app.components.OmniBOLTNodes.columns.logintime',
      defaultMessage: 'Login Time',
    },
    offlinetime: {
      id: 'app.components.OmniBOLTNodes.columns.offlinetime',
      defaultMessage: 'Off line Time',
    },
  },
});