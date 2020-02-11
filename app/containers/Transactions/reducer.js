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
  stamp: null,
};
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';

/* eslint-disable default-case, no-param-reassign */
const transactionsReducer = (state = initialState, { type, addr, transactions, pages, page, txType } = action) =>
  produce(state, draft => {
    switch (type) {
      case LOAD_TRANSACTIONS:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.unconfirmed = false;
        break;
      case LOAD_UNCONFIRMED:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.currentPage = 1;
        draft.unconfirmed = true;
        break;
      case LOAD_TRANSACTIONS_SUCCESS: {
        const maxPagesByMedia = getMaxPagesByMedia();

        draft.transactions = addr ? transactions.filter(tx => !!tx.confirmations) : transactions;
        draft.pageCount = state.unconfirmed ? Math.ceil(transactions.length / maxPagesByMedia) : pages;
        draft.loading = false;
        draft.stamp = Date.now();
        break;
      }
      case SET_PAGE:
        draft.currentPage = Number(page);
        break;
      case SET_TRANSACTION_TYPE:
        draft.txType = txType;
        break;
    }
  });

export default transactionsReducer;
