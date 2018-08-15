import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import TransactionList from '../index';

describe('<TransactionList />', () => {
  const ReactComponent = () => <TransactionList />;
  it('should render <TransactionList />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
