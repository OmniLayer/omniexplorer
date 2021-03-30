/*
 *
 * OmniBOLT reducer
 *
 */
import produce from 'immer';
import { LOAD_USERS, LOAD_USERS_SUCCESS, SET_PAGE } from './constants';

export const initialState = {
  data: [],
  error: null,
  isFetching: false,
  lastFetched: 0,
  // pageNum: 0,
  // pageSize: 0,
  // totalCount: 0,
  // totalPage: 0,
  currentPage: 0,
  pageSize: 0,
  totalCount: 0,
  pageCount: 0,
};

/* eslint-disable default-case, no-param-reassign */
const OmniBOLTUsersReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;
  return produce(state, draft => {
    switch (type) {
      case LOAD_USERS:
        draft.isFetching = true;
        draft.error = null;
        draft.status = {};
        break;
      case LOAD_USERS_SUCCESS:
        draft.isFetching = false;
        draft.lastFetched = Date.now();
        draft.error = null;

        draft.data = payload.data;
        draft.currentPage = Number(payload.pageNum);
        draft.pageSize = payload.pageSize;
        draft.totalCount = payload.totalCount;
        draft.pageCount = payload.totalPage;
        break;
      case SET_PAGE:
        draft.isFetching = true;
        draft.error = null;
        draft.currentPage = Number(payload.pageNum);
        break;
    }
  });
};

export default OmniBOLTUsersReducer;
