import React from 'react';
import { IntlProvider } from 'react-intl';
// import ReactTestUtils from 'react-dom/test-utils';
import { connect } from 'react-redux';
import { shallow, render, mount } from 'enzyme';
import { mountWithState, shallowWithState, mountWithStore } from 'enzyme-redux';
// import { createMockStore } from 'redux-test-utils';

import SanitizedFormattedNumber from '../index';

describe('<SanitizedFormattedNumber />', () => {
  const ReactComponent = () => (<SanitizedFormattedNumber />);
  it('should render <SanitizedFormattedNumber />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = (state) => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent value={'1.001'}/>, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
  
  it('should format number', ()=>{
    const component = <IntlProvider locale="en"><SanitizedFormattedNumber value={'1.001'}/></IntlProvider>;
    const monted = mount(component);
    expect(monted.children().length).toBe(1);
    expect(monted.text()).toBe("1.001");
  });
});
