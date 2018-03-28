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
