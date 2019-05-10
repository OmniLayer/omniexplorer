/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import DevTools from 'utils/devTools';
import createReducer from './reducers';
import { GLOBAL_ON_SAGA_ERROR } from 'constants.js';

let dispatchFn;

const sagaMiddleware = createSagaMiddleware({
  onError: e => {
    // And let's modify this one just for clarity on screen shots
    console.log('Global saga error handler', e);
    dispatchFn({ type: GLOBAL_ON_SAGA_ERROR, error: e });
  },
});

// Import DevTools, only for dev environment
const isDev = process.env.NODE_ENV !== 'production';

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  if (isDev) {
    enhancers.push(DevTools.instrument());
  }

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
    // Prevent recomputing reducers for `replaceReducer`
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  //dispatch
  let dispatch = store.dispatch;
  const middlewareAPI = {
    getState: store.getState,
    dispatch: (action) => dispatch(action)
  };
  dispatch = compose(sagaMiddleware(middlewareAPI))(store.dispatch);
  dispatchFn = dispatch;

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  // return store;
  return {
    ...store,
    dispatch,
  };
}
