import { fromJS } from 'immutable';

import {
  LOAD_CROWDSALE_TRANSACTIONS,
  LOAD_CROWDSALE_TRANSACTIONS_ERROR,
  LOAD_CROWDSALE_TRANSACTIONS_SUCCESS,
  SET_CROWDSALES_TRANSACTIONS_PAGE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  transactions: [],
  pageCount: 0,
  currentPage: 0,
  total: 0,
});

const sortDateFordward = array =>
  array.sort((current, previous) => current.blocktime < previous.blocktime);

function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CROWDSALE_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('transactions', [])
        .set('pageCount', 0)
        .set('total', 0);
    case LOAD_CROWDSALE_TRANSACTIONS_SUCCESS:
      return state
        .set('transactions', sortDateFordward(action.transactions))
        .set('pageCount', action.pages)
        .set('total', action.total)
        .set('loading', false)
        .set('error', false);
    case LOAD_CROWDSALE_TRANSACTIONS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SET_CROWDSALES_TRANSACTIONS_PAGE:
      return state.set('loading', true).set('currentPage', action.page);
    default:
      return state;
  }
}

export default transactionsReducer;
