/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { mountWithIntl } from 'tests/intl-enzyme-test-helper';
import { FormattedMessage } from 'react-intl';

import NotFound from '../index';
import messages from '../messages';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = mountWithIntl(<NotFound />, messages);
    const expected = <FormattedMessage {...messages.header} />;
    expect(renderedComponent.contains(expected)).toEqual(true);
  });
});
