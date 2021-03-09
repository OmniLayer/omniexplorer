/*
 *
 * OmniBolt reducer
 *
 */
import produce from 'immer';
import { LOAD_USERS, LOAD_USERS_SUCCESS } from './constants';

export const initialState = {
  data: {},
  error: null,
  isFetching: false,
  lastFetched: 0,
};

/* eslint-disable default-case, no-param-reassign */
const omniBoltUsersReducer = (state = initialState, action = {}) => {
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
        draft.data = payload;
        break;
    }
  });
};

export default omniBoltUsersReducer;
