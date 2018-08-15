import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import { AssetInfo } from '../index';

describe('<AssetInfo />', () => {
  const ReactComponent = () => <AssetInfo />;
  it('should render <AssetInfo />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
