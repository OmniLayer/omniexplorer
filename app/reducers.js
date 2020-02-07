/**
 * Combine all reducers in this file and export the combined reducers.
 */
import produce from 'immer';
import { combineReducers } from 'redux';
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';
import history from 'utils/history';
import merge from 'lodash/merge';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import crowdsaleTransactionsReducer from 'containers/CrowdsaleDetail/reducer';
import activationsReducer from 'containers/Activations/reducer';
import tokenReducer from 'components/Token/reducer';
import statusReducer from 'components/ServiceBlock/reducer';
import blocksReducer from 'containers/Blocks/reducer';
import errorBoundary from 'components/ErrorBoundary/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = {
  location: null,
};

/**
 * Merge route into the global application state
 */
/* eslint-disable default-case, no-param-reassign */
const routeReducer = (state = routeInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      /* istanbul ignore next */
      case LOCATION_CHANGE:
        merge(draft.location, action.payload);
        break;
    }
  });

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    token: tokenReducer,
    status: statusReducer,
    crowdsaleTransactions: crowdsaleTransactionsReducer,
    activations: activationsReducer,
    blocks: blocksReducer,
    errorBoundary,
    global: () => ({
      loading: false,
      error: false,
    }),
    ...injectedReducers,
    router: connectRouter(history),
  });
}
