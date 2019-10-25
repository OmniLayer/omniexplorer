import produce from 'immer';
import { LOAD_STATUS, LOAD_STATUS_SUCCESS } from './constants';

export const initialState = {
  status: {},
  error: null,
  isFetching: false,
  lastFetched: 0,
};

/* eslint-disable default-case, no-param-reassign */
const statusReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;
  return produce(state, draft => {
    switch (type) {
      case LOAD_STATUS:
        draft.isFetching = true;
        draft.error = null;
        draft.status = {};
        break;
      case LOAD_STATUS_SUCCESS:
        draft.isFetching = false;
        draft.lastFetched = Date.now();
        draft.error = null;
        draft.status = payload;
        break;
    }
  });
};

export default statusReducer;
