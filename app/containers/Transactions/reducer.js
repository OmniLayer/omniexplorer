/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  data: {
    transactions: false,
  },
});

function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['data', 'transactions'], false);
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .setIn(['data', 'transactions'], action.transactions)
        .set('loading', false);
    case LOAD_TRANSACTIONS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default transactionsReducer;
