import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import HeaderMessage from '../index';

describe('<HeaderMessage />', () => {
  const ReactComponent = () => <HeaderMessage />;
  it('should render <HeaderMessage />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
