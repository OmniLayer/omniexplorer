/*
 *
 * Search reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SEARCH,
  LOAD_SEARCH_ERROR,
  LOAD_SEARCH_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: false,
  query: '',
  address: {
    balance: [],
  },
  asset: [],
  tx: {},
});

function searchReducer(state = initialState, action) {
  const { error, payload, type } = action;

  switch (type) {
    case LOAD_SEARCH:
      return state.set('loading', true).set('error', false);
    case LOAD_SEARCH_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('query', payload.query)
        .set('address', payload.data.address)
        .set('asset', payload.data.asset)
        .set('tx', payload.data.tx);
    case LOAD_SEARCH_ERROR:
      return state.set('error', error).set('loading', false);
    default:
      return state;
  }
}

export default searchReducer;
