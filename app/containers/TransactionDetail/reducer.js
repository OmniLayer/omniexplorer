/*
 *
 * TransactionDetail reducer
 *
 */
import produce from 'immer';
import { LOAD_TRANSACTION, LOAD_TRANSACTION_SUCCESS } from './constants';

export const initialState = {
  transaction: {
    notFound: false,
  },
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const transactionDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TRANSACTION:
        draft.loading = true;
        draft.error = false;
        draft.transaction = {};
        break;
      case LOAD_TRANSACTION_SUCCESS:
        draft.transaction =
          typeof action.transaction === 'string'
            ? { notFound: true }
            : action.transaction;
        draft.error = false;
        draft.loading = false;
        break;
    }
  });

export default transactionDetailReducer;
