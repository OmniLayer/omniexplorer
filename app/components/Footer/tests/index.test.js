import React from 'react';
import { shallowWithIntl } from 'tests/intl-enzyme-test-helper';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import Footer from '../index';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallowWithIntl(<Footer />, messages);
    const expected = <FormattedMessage {...messages.licenseMessage} />;
    expect(renderedComponent.contains(expected)).toBe(true);
  });
});
