/*
 *
 * TransactionDetail reducer
 *
 */

import {
  LOAD_TRANSACTION,
  LOAD_TRANSACTION_SUCCESS,
} from './constants';

import produce from 'immer';

export const initialState = {
  transaction: {
    notFound: false,
  },
  loading: true,
};

function transactionDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTION:
      return state
        .set('loading', true)
        .set('error', false)
        .set('transaction', {});
    case LOAD_TRANSACTION_SUCCESS:
      return state
        .set(
          'transaction',
          typeof action.transaction === 'string'
            ? { notFound: true }
            : action.transaction,
        )
        .set('error', false)
        .set('loading', false);
    default:
      return state;
  }
}

export default transactionDetailReducer;
