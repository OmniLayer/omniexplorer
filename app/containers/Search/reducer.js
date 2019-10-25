/*
 *
 * Search reducer
 *
 */

import {
  LOAD_SEARCH,
  LOAD_SEARCH_SUCCESS,
} from './constants';

import produce from 'immer';

export const initialState = {
  loading: true,
  query: '',
  address: {
    balance: [],
  },
  asset: [],
  tx: {},
};

function searchReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_SEARCH:
      return state.set('loading', true);
    case LOAD_SEARCH_SUCCESS:
      return state
        .set('loading', false)
        .set('query', payload.query)
        .set('address', payload.data.address)
        .set('asset', payload.data.asset)
        .set('tx', payload.data.tx);
    default:
      return state;
  }
}

export default searchReducer;
