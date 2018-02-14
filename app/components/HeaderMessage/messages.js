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
    defaultMessage: '{note} The OmniExplorer.info domain will transition to the Omni Foundation at the end of Feb 2018, where a new and improved block explorer will take over.',
    values: {
      note: <strong>NOTE:</strong>,
    },
    tagName: 'small',
  },
});

// (props) => <h1 {...props} className="class" />,
