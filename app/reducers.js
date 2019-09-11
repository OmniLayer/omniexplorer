/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'connected-react-router';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import transactionsReducer from 'containers/Transactions/reducer';
import tokenReducer from 'components/Token/reducer';
import statusReducer from 'components/ServiceBlock/reducer';
import blocksReducer from 'containers/Blocks/reducer';
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
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    token: tokenReducer,
    status: statusReducer,
    transactions: transactionsReducer,
    blocks: blocksReducer,
    global: () => ({
      loading: false,
      error: false,
    }),
    ...injectedReducers,
  });
}
