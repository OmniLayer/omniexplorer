import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import NoOmniBlockTransactions from '../index';

describe('<NoOmniBlockTransactions />', () => {
  const ReactComponent = () => <NoOmniBlockTransactions />;
  it('should render <NoOmniBlockTransactions />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
