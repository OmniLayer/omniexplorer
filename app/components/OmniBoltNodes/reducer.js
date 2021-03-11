/*
 *
 * OmniBOLT Nodes reducer
 *
 */
import produce from 'immer';
import { LOAD_NODES, LOAD_NODES_SUCCESS } from './constants';

export const initialState = {
  data: [],
  error: null,
  isFetching: false,
  lastFetched: 0,
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPage: 0,
};

/* eslint-disable default-case, no-param-reassign */
const OmniBOLTNodesReducer = (state = initialState, action = {}) => {
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

        draft.data = payload.data;
        draft.pageNum = payload.pageNum;
        draft.pageSize = payload.pageSize;
        draft.totalCount = payload.totalCount;
        draft.totalPage = payload.totalPage;
        break;
    }
  });
};

export default OmniBOLTNodesReducer;
