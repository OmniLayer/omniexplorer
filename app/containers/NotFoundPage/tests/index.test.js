import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';

import NotFoundPage from '../index';
import messages from '../messages';

describe('<NotFoundPage />', () => {
  // const initialState = {};
  // const mockStore = configureStore();
  // let store;
  // let container;
  //
  // beforeEach(() => {
  //   store = mockStore(initialState);
  // });
  it('should render <NotFoundPage  dispatch={dispatch} store={store} />', () => {
    const children = (<FormattedMessage {...messages.header} />);
    const renderedComponent = shallow(<NotFoundPage locale="en"></NotFoundPage>);
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
