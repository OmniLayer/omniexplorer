import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import TransactionListHeader from '../index';

describe('<TransactionListHeader />', () => {
  const ReactComponent = () => <TransactionListHeader />;
  it('should render <TransactionListHeader />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
