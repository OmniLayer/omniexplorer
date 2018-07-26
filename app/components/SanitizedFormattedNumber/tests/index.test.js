import React from 'react';
import { IntlProvider } from 'react-intl';
// import ReactTestUtils from 'react-dom/test-utils';
import { connect } from 'react-redux';
import { mount } from 'enzyme';
import { shallowWithState } from 'enzyme-redux';
import SanitizedFormattedNumber from '../index';
// import { createMockStore } from 'redux-test-utils';

describe('<SanitizedFormattedNumber />', () => {
  const ReactComponent = () => <SanitizedFormattedNumber />;
  it('should render <SanitizedFormattedNumber />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = state => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(
      <ConnectedComponent value="1.001" />,
      expectedState,
    );
    expect(component.props().state).toBe(expectedState);
  });

  it('should format number', () => {
    const component = (
      <IntlProvider locale="en">
        <SanitizedFormattedNumber value="1001.001000" />
      </IntlProvider>
    );
    const monted = mount(component);
    expect(monted.children().length).toBe(1);
    expect(monted.text()).toBe('1,001.001');
  });

  it('should format number with maximum decimal places', () => {
    const component = (
      <IntlProvider locale="en">
        <SanitizedFormattedNumber value="364.98653211" />
      </IntlProvider>
    );
    const monted = mount(component);
    expect(monted.children().length).toBe(1);
    expect(monted.text()).toBe('364.98653211');
  });
});
