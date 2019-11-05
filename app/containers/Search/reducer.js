/*
 *
 * Search reducer
 *
 */
import produce from 'immer';
import { LOAD_SEARCH, LOAD_SEARCH_SUCCESS } from './constants';

export const initialState = {
  loading: true,
  query: '',
  address: {
    balance: [],
  },
  asset: [],
  tx: {},
};

/* eslint-disable default-case, no-param-reassign */
const searchReducer = (state = initialState, { payload, type } = action) =>
  produce(state, draft => {
    switch (type) {
      case LOAD_SEARCH:
        draft.loading = true;
        break;
      case LOAD_SEARCH_SUCCESS:
        draft.loading = false;
        draft.query = payload.query;
        draft.address = payload.data.address;
        draft.asset = payload.data.asset;
        draft.tx = payload.data.tx;
        break;
    }
  });

export default searchReducer;
