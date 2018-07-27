/*
 *
 * TransactionDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_TRANSACTION,
  LOAD_TRANSACTION_ERROR,
  LOAD_TRANSACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  transaction: {
    notFound: false,
  },
  loading: true,
});

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
    case LOAD_TRANSACTION_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default transactionDetailReducer;
