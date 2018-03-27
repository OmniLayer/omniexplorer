import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import SanitizedFormattedNumber from '../index';

describe('<SanitizedFormattedNumber />', () => {
  const ReactComponent = () => (<SanitizedFormattedNumber />);
  it('should render <SanitizedFormattedNumber />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = (state) => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});

// import React from 'react';
// import { mountWithIntl } from 'tests/intl-enzyme-test-helper';
//
// import SanitizedFormattedNumber from '../index';
//
// describe('<SanitizedFormattedNumber />', () => {
//   it('renders a <SanitizedFormattedNumber>', () => {
//     const renderedComponent = mountWithIntl(<SanitizedFormattedNumber value="10.0001" />);
//     expect(renderedComponent.find('span').node).toBeDefined();
//   });
// });
