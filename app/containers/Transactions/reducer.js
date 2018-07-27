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
  SET_PAGE,
  SET_TRANSACTION_TYPE,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  transactions: [],
  pageCount: 0,
  currentPage: 0,
  txType: null,
});

function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('transactions', [])
        .set('pageCount', 0);
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .set('transactions', action.transactions)
        .set('pageCount', action.pages)
        .set('loading', false)
        .set('error', false);
    case LOAD_TRANSACTIONS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SET_PAGE:
      return state.set('currentPage', action.page);
    case SET_TRANSACTION_TYPE:
      return state.set('txType', action.txType);
    default:
      return state;
  }
}

export default transactionsReducer;
