import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';

import Header from 'components/Header';
import Footer from 'components/Footer';
import App from '../index';

describe('<App />', () => {
  describe('should render Header', () => {
    const ReactComponent = () => <Header />;
    it('works', () => {
      const expectedState = 'expectedState';
      const mapStateToProps = state => ({
        state,
      });
      const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
      const component = shallowWithStore(
        <ConnectedComponent />,
        createMockStore(expectedState),
      );
      expect(component.props().state).toBe(expectedState);
    });
  });

  describe('should render some routes', () => {
    const ReactComponent = () => <App />;
    it('works', () => {
      const expectedState = 'expectedState';
      const mapStateToProps = state => ({
        state,
      });
      const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
      const component = shallowWithStore(
        <ConnectedComponent />,
        createMockStore(expectedState),
      );
      expect(component.props().state).toBe(expectedState);
    });
  });

  describe('should render Footer', () => {
    const ReactComponent = () => <Footer />;
    it('works', () => {
      const expectedState = 'expectedState';
      const mapStateToProps = state => ({
        state,
      });
      const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
      const component = shallowWithStore(
        <ConnectedComponent />,
        createMockStore(expectedState),
      );
      expect(component.props().state).toBe(expectedState);
    });
  });
});
