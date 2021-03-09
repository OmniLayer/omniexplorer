/*
 *
 * OmniBolt reducer
 *
 */
import produce from 'immer';
import { LOAD_NODES, LOAD_NODES_SUCCESS } from './constants';

export const initialState = {
  data: {},
  error: null,
  isFetching: false,
  lastFetched: 0,
};

/* eslint-disable default-case, no-param-reassign */
const omniBoltNodesReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;
  return produce(state, draft => {
    switch (type) {
      case LOAD_NODES:
        draft.isFetching = true;
        draft.error = null;
        draft.status = {};
        break;
      case LOAD_NODES_SUCCESS:
        draft.isFetching = false;
        draft.lastFetched = Date.now();
        draft.error = null;
        draft.data = payload;
        break;
    }
  });
};

export default omniBoltNodesReducer;
