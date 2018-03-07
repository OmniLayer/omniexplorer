/*
 * HeaderMessage Messages
 *
 * This contains all the text for the HeaderMessage component.
 */
import React from 'react';
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.HeaderMessage.header',
    defaultMessage: '{note} Welcome to the new Omniexplorer.info',
    values: {
      note: <strong>NOTE:</strong>,
    },
  },
});

// (props) => <h1 {...props} className="class" />,
