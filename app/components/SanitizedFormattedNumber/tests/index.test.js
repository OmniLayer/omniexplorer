import React from 'react';
import { shallow } from 'enzyme';

import SanitizedFormattedNumber from '../index';

describe('<SanitizedFormattedNumber />', () => {
  it('renders a <SanitizedFormattedNumber>', () => {
    const renderedComponent = shallow(<SanitizedFormattedNumber value="10.0001" />);
    expect(renderedComponent.find('span').node).toBeDefined();
  });
});
