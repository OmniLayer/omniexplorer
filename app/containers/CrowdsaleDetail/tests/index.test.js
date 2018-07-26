import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import { CrowdsaleDetail } from '../index';

describe('<CrowdsaleDetail />', () => {
  const ReactComponent = () => <CrowdsaleDetail />;
  it('should render <CrowdsaleDetail />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
