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
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_UNCONFIRMED,
  SET_PAGE,
  SET_TRANSACTION_TYPE,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  transactions: [],
  pageCount: 0,
  currentPage: 1,
  txType: null,
  unconfirmed: false,
});

function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('transactions', [])
        .set('pageCount', 0)
        .set('unconfirmed', false);
    case LOAD_UNCONFIRMED:
      return state
        .set('loading', true)
        .set('transactions', [])
        .set('unconfirmed', true);
    case LOAD_TRANSACTIONS_SUCCESS: {
      const unconfirmed = state.get('unconfirmed');
      const transactions = action.addr ? action.transactions.filter(tx => !!tx.confirmations) : action.transactions;
      return state
        .set('transactions', transactions)
        .set(
          'pageCount',
          unconfirmed ? transactions.length : action.pages,
        )
        .set('loading', false);
    }
    case SET_PAGE:
      return state.set('currentPage', action.page);
    case SET_TRANSACTION_TYPE:
      return state.set('txType', action.txType);
    default:
      return state;
  }
}

export default transactionsReducer;
