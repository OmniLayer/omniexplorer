import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import { NoOmniBlocks } from '../index';

describe('<NoOmniBlocks />', () => {
  const ReactComponent = () => <NoOmniBlocks />;
  it('should render <NoOmniBlocks />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
