import React from 'react';
import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';

import TransactionInfo from '../index';

describe('<TransactionInfo />', () => {
  const ReactComponent = () => <TransactionInfo />;
  it('should render <TransactionInfo />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
