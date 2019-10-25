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
import produce from 'immer';
import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_UNCONFIRMED,
  SET_PAGE,
  SET_TRANSACTION_TYPE,
} from './constants';

export const initialState = {
  loading: false,
  transactions: [],
  pageCount: 0,
  currentPage: 1,
  txType: null,
  unconfirmed: false,
};

/* eslint-disable default-case, no-param-reassign */
const transactionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TRANSACTIONS:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.unconfirmed = false;
        break;
      case LOAD_UNCONFIRMED:
        draft.loading = true;
        draft.transactions = [];
        draft.unconfirmed = true;
        break;
      case LOAD_TRANSACTIONS_SUCCESS: {
        const unconfirmed = state.get('unconfirmed');
        const transactions = action.addr ? action.transactions.filter(tx => !!tx.confirmations) : action.transactions;
        draft.transactions = transactions;
        draft.pageCount = unconfirmed ? transactions.length : action.pages;
        draft.loading = false;
        break;
      }
      case SET_PAGE:
        draft.currentPage = action.page;
        break;
      case SET_TRANSACTION_TYPE:
        draft.txType = action.txType;
        break;
    }
  });

export default transactionsReducer;
