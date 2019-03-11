/*
 * Activations Messages
 *
 * This contains all the text for the Activations component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.Activations.header',
    defaultMessage: 'Activations',
  },
  columns: {
    id: {
      id: 'app.containers.Activations.columns.id',
      defaultMessage: 'Id',
    },
    name: {
      id: 'app.containers.Activations.columns.name',
      defaultMessage: 'Name',
    },
    block: {
      id: 'app.containers.Activations.columns.block',
      defaultMessage: 'Block',
    },
    minimumVersion: {
      id: 'app.containers.Activations.columns.minimumversion',
      defaultMessage: 'Minimum Version',
    },
  }
});
